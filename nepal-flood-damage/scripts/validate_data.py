#!/usr/bin/env python3
"""
Validate an event folder's CSVs against the JSON Schemas in schema/, and run
the "damage should not exceed baseline" sanity check described in
METHODOLOGY.md sections 7-8.

Usage:
    python scripts/validate_data.py data/events/EXAMPLE-2024-09-sample-event
    python scripts/validate_data.py data/baseline

Errors (schema violations, dangling source_id / adm4_pcode references) cause
a non-zero exit. The baseline-vs-damage sanity check is reported as a
warning, not an error, per METHODOLOGY.md section 8 (a baseline can itself
be an undercount -- this is a flag for human review, not automatic
rejection).
"""
import argparse
import glob
import json
import os
import sys

import pandas as pd
from jsonschema import Draft202012Validator

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCHEMA_DIR = os.path.join(ROOT, "schema")
ADMIN_BOUNDARY_DIR = os.path.join(ROOT, "data", "admin-boundaries")
BASELINE_DIR = os.path.join(ROOT, "data", "baseline")

# Maps each damage indicator to the baseline indicator it should not exceed.
# Indicators with no natural baseline ceiling (e.g. deaths against total
# population is a very loose bound) are mapped to the closest meaningful
# denominator; omitted indicators (e.g. livestock_lost) are skipped.
DAMAGE_TO_BASELINE = {
    "houses_destroyed": "houses_total",
    "houses_partially_damaged": "houses_total",
    "households_displaced": "households_total",
    "deaths": "population_total",
    "missing": "population_total",
    "injured": "population_total",
    "displaced_persons": "population_total",
    "schools_damaged": "schools_total",
    "schools_destroyed": "schools_total",
    "students_affected": "school_enrollment_total",
    "health_facilities_damaged": "health_facilities_total",
    "road_km_damaged": "road_km_local",
    "road_km_destroyed": "road_km_local",
    "bridges_damaged": "bridges_total",
    "irrigation_structures_damaged": "irrigation_structures_total",
    "businesses_damaged": "businesses_total",
    "workers_affected": "persons_engaged_total",
    "cropland_hectares_affected": "cropland_hectares",
}


def load_schema(name):
    with open(os.path.join(SCHEMA_DIR, f"{name}.schema.json")) as f:
        return json.load(f)


def find_csvs(directory, keyword, exclude=("template",)):
    if not os.path.isdir(directory):
        return []
    matches = []
    for path in glob.glob(os.path.join(directory, "*.csv")):
        base = os.path.basename(path).lower()
        if keyword in base and not any(x in base for x in exclude):
            matches.append(path)
    return sorted(matches)


def validate_rows(csv_path, schema, errors):
    # Note: comment='#' is deliberately NOT used here -- real data rows may
    # legitimately contain '#' (e.g. "Situation Report #14"), and only the
    # *_template.csv files (never read by this script) use '#' for
    # human-readable header comments.
    df = pd.read_csv(csv_path, keep_default_na=False, skip_blank_lines=True)
    df = df.replace("", None)
    validator = Draft202012Validator(schema)
    for i, row in df.iterrows():
        record = row.dropna().to_dict()
        for err in validator.iter_errors(record):
            errors.append(f"{csv_path}:{i + 2}: {err.message}")
    return df


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("target_dir", help="Event folder (or data/baseline) to validate")
    args = parser.parse_args()

    target_dir = os.path.abspath(args.target_dir)
    errors = []
    warnings = []

    schemas = {
        "admin_boundary": load_schema("admin_boundary"),
        "baseline": load_schema("baseline"),
        "damage_record": load_schema("damage_record"),
        "source_citation": load_schema("source_citation"),
    }

    # Admin boundary: look in the target dir first, then the shared reference dir.
    admin_files = find_csvs(target_dir, "admin_boundary") or find_csvs(ADMIN_BOUNDARY_DIR, "")
    admin_dfs = [validate_rows(p, schemas["admin_boundary"], errors) for p in admin_files]
    admin_df = pd.concat(admin_dfs, ignore_index=True) if admin_dfs else pd.DataFrame(columns=["adm4_pcode"])
    if admin_df.empty:
        warnings.append("No admin_boundary reference found -- adm4_pcode values cannot be cross-checked.")

    # Sources: only meaningful within the target dir itself.
    source_files = find_csvs(target_dir, "source")
    source_dfs = [validate_rows(p, schemas["source_citation"], errors) for p in source_files]
    source_df = pd.concat(source_dfs, ignore_index=True) if source_dfs else pd.DataFrame(columns=["source_id"])

    # Baseline: target dir first, else the shared baseline dir.
    baseline_files = find_csvs(target_dir, "baseline") or find_csvs(BASELINE_DIR, "")
    baseline_dfs = [validate_rows(p, schemas["baseline"], errors) for p in baseline_files]
    baseline_df = pd.concat(baseline_dfs, ignore_index=True) if baseline_dfs else pd.DataFrame(
        columns=["adm4_pcode", "indicator", "value", "source_id"]
    )

    # Damage records: target dir only (an event's own data).
    damage_files = find_csvs(target_dir, "damage")
    damage_dfs = [validate_rows(p, schemas["damage_record"], errors) for p in damage_files]
    damage_df = pd.concat(damage_dfs, ignore_index=True) if damage_dfs else pd.DataFrame(
        columns=["adm4_pcode", "indicator", "value", "source_id", "verification_level"]
    )

    # Cross-reference checks.
    known_sources = set(source_df.get("source_id", pd.Series(dtype=str)))
    known_wards = set(admin_df.get("adm4_pcode", pd.Series(dtype=str)))

    for df, label in ((baseline_df, "baseline"), (damage_df, "damage_record")):
        if df.empty:
            continue
        if known_sources:
            bad = set(df["source_id"]) - known_sources
            for sid in bad:
                errors.append(f"{label}: source_id '{sid}' has no matching source_citation entry")
        if known_wards:
            bad = set(df["adm4_pcode"]) - known_wards
            for pcode in bad:
                errors.append(f"{label}: adm4_pcode '{pcode}' has no matching admin_boundary entry")

    # Sanity check: damage should not exceed its mapped baseline, per ward.
    if not damage_df.empty and not baseline_df.empty:
        baseline_lookup = baseline_df.set_index(["adm4_pcode", "indicator"])["value"]
        for _, row in damage_df.iterrows():
            baseline_indicator = DAMAGE_TO_BASELINE.get(row["indicator"])
            if not baseline_indicator:
                continue
            key = (row["adm4_pcode"], baseline_indicator)
            if key in baseline_lookup.index:
                baseline_value = baseline_lookup.loc[key]
                if row["value"] > baseline_value:
                    warnings.append(
                        f"ward {row['adm4_pcode']}: {row['indicator']}={row['value']} "
                        f"exceeds baseline {baseline_indicator}={baseline_value} "
                        f"-- review before publishing (baseline may be an undercount, "
                        f"or this may be a data-entry error)."
                    )
        # unverified rows should not silently end up looking like published data
        unverified = damage_df[damage_df.get("verification_level") == "unverified"]
        for _, row in unverified.iterrows():
            warnings.append(
                f"ward {row['adm4_pcode']}: {row['indicator']} is 'unverified' -- "
                f"per CONTRIBUTING.md this must not be included in published totals."
            )

    print(f"Validated: {len(admin_files)} admin boundary file(s), {len(baseline_files)} baseline file(s), "
          f"{len(damage_files)} damage file(s), {len(source_files)} source file(s) in {target_dir}\n")

    if warnings:
        print(f"{len(warnings)} warning(s):")
        for w in warnings:
            print(f"  - {w}")
        print()

    if errors:
        print(f"{len(errors)} error(s):")
        for e in errors:
            print(f"  - {e}")
        sys.exit(1)

    print("No schema or cross-reference errors found.")


if __name__ == "__main__":
    main()
