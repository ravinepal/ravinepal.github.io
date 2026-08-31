#!/usr/bin/env python3
"""
Roll ward-level (adm4) damage records up to Local Level (adm3), District
(adm2), and Province (adm1), per the aggregation rules in METHODOLOGY.md
section 7:

  - Counts are summed across child wards.
  - Rates/percentages are recomputed from summed numerator (damage) and
    summed denominator (baseline) at the parent level -- never averaged
    from child ward percentages.
  - Coverage (how many of an admin unit's wards actually have a reported
    value for that indicator) is reported alongside every aggregate, since
    a "no data" ward is not the same as a "zero reported" ward.

Usage:
    python scripts/aggregate.py data/events/EXAMPLE-2024-09-sample-event
    python scripts/aggregate.py data/events/EXAMPLE-2024-09-sample-event --level adm2
"""
import argparse
import glob
import os

import pandas as pd

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ADMIN_BOUNDARY_DIR = os.path.join(ROOT, "data", "admin-boundaries")

# Same mapping as validate_data.py -- kept in sync manually since both are
# small, human-reviewed lookup tables tied to the schema's controlled
# vocabularies (see METHODOLOGY.md section 6).
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


def find_csv(directory, keyword, exclude=("template",)):
    for path in sorted(glob.glob(os.path.join(directory, "*.csv"))):
        base = os.path.basename(path).lower()
        if keyword in base and not any(x in base for x in exclude):
            return path
    return None


def load_concat(directory, keyword):
    # Note: comment='#' is deliberately NOT used here -- see validate_data.py.
    frames = []
    for path in sorted(glob.glob(os.path.join(directory, "*.csv"))):
        base = os.path.basename(path).lower()
        if keyword in base and "template" not in base:
            frames.append(pd.read_csv(path, keep_default_na=False, skip_blank_lines=True).replace("", None))
    return pd.concat(frames, ignore_index=True) if frames else pd.DataFrame()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("event_dir", help="Event folder, e.g. data/events/EXAMPLE-2024-09-sample-event")
    parser.add_argument(
        "--level", choices=["adm1", "adm2", "adm3"], default="adm3",
        help="Admin level to aggregate to (default: adm3, i.e. Local Level / Palika)",
    )
    args = parser.parse_args()
    event_dir = os.path.abspath(args.event_dir)

    admin_df = load_concat(event_dir, "admin_boundary")
    if admin_df.empty:
        admin_df = load_concat(ADMIN_BOUNDARY_DIR, "")
    if admin_df.empty:
        raise SystemExit("No admin_boundary reference found in event dir or data/admin-boundaries/.")

    baseline_df = load_concat(event_dir, "baseline")
    damage_df = load_concat(event_dir, "damage")
    if damage_df.empty:
        raise SystemExit(f"No damage CSV found in {event_dir}")

    # Per CONTRIBUTING.md: 'unverified' rows must not be included in
    # published totals/rates. Report how many were excluded so the exclusion
    # is visible rather than silent.
    unverified_mask = damage_df["verification_level"] == "unverified"
    if unverified_mask.any():
        print(f"Excluding {unverified_mask.sum()} 'unverified' row(s) from aggregation "
              f"(see CONTRIBUTING.md):")
        for _, row in damage_df[unverified_mask].iterrows():
            print(f"  - ward {row['adm4_pcode']}: {row['indicator']} = {row['value']}")
        print()
    damage_df = damage_df[~unverified_mask]

    level = args.level
    pcode_col, name_col = f"{level}_pcode", f"{level}_name"

    # Total wards per parent unit (for coverage reporting).
    wards_total = admin_df.groupby(pcode_col)["adm4_pcode"].nunique().rename("wards_total")

    damage = damage_df.merge(admin_df[["adm4_pcode", pcode_col, name_col]], on="adm4_pcode", how="left")

    rows = []
    for indicator, group in damage.groupby("indicator"):
        agg = group.groupby([pcode_col, name_col]).agg(
            damage_sum=("value", "sum"),
            wards_reporting=("adm4_pcode", "nunique"),
        ).reset_index()
        agg = agg.merge(wards_total, on=pcode_col, how="left")

        baseline_indicator = DAMAGE_TO_BASELINE.get(indicator)
        if baseline_indicator and not baseline_df.empty:
            base = baseline_df[baseline_df["indicator"] == baseline_indicator]
            base = base.merge(admin_df[["adm4_pcode", pcode_col]], on="adm4_pcode", how="left")
            base_sum = base.groupby(pcode_col)["value"].sum().rename("baseline_sum")
            agg = agg.merge(base_sum, on=pcode_col, how="left")
            agg["rate_pct"] = (agg["damage_sum"] / agg["baseline_sum"] * 100).round(2)
        else:
            agg["baseline_sum"] = None
            agg["rate_pct"] = None

        agg.insert(0, "indicator", indicator)
        agg.insert(1, "baseline_indicator", baseline_indicator)
        rows.append(agg)

    result = pd.concat(rows, ignore_index=True)
    result = result.rename(columns={pcode_col: "level_pcode", name_col: "level_name"})
    result.insert(0, "level", level)
    cols = ["level", "level_pcode", "level_name", "indicator", "damage_sum",
            "baseline_indicator", "baseline_sum", "rate_pct", "wards_reporting", "wards_total"]
    result = result[cols].sort_values(["level_pcode", "indicator"])

    pd.set_option("display.max_rows", None)
    pd.set_option("display.width", 160)
    print(result.to_string(index=False))


if __name__ == "__main__":
    main()
