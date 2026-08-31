# Nepal Flood Damage — Ward-Level Assessment Framework

A framework for publishing flood damage in Nepal at **ward level** (the
lowest administrative unit), comparing what existed before an event
(housing, roads, schools, population, businesses, health facilities) against
what was damaged, with every figure traceable to a cited source.

**Start here:** [`METHODOLOGY.md`](./METHODOLOGY.md) — the full methodology:
principles, admin framework, data sources, data model, verification rules,
and the publishing plan.

## Status

This is a **framework and schema release** (v0.1) — not yet populated with a
real event's data. See [`CHANGELOG.md`](./CHANGELOG.md). The
`data/events/EXAMPLE-2024-09-sample-event/` folder contains a small,
clearly-labeled **mock** dataset used only to demonstrate the format and
exercise the validation/aggregation scripts — it is not real damage data.

## Layout

```
nepal-flood-damage/
├── METHODOLOGY.md         # the methodology (read this first)
├── CONTRIBUTING.md        # sourcing rules, how to add a real event, corrections
├── CHANGELOG.md           # dated, append-only record of changes/corrections
├── schema/                # JSON Schemas — the machine-checkable contract
├── templates/             # CSV templates matching the schemas
├── data/
│   ├── admin-boundaries/  # how to get official ward (P-code) boundaries — not vendored here
│   ├── baseline/          # how to source pre-flood baseline indicators
│   └── events/            # one dated folder per flood event
└── scripts/               # validate_data.py, aggregate.py
```

## Quick start

```bash
cd nepal-flood-damage
pip install -r scripts/requirements.txt

# Validate an event's data against the schemas + sanity checks
python scripts/validate_data.py data/events/EXAMPLE-2024-09-sample-event

# Roll ward-level figures up to local level / district / province
python scripts/aggregate.py data/events/EXAMPLE-2024-09-sample-event
```

## Adding a real event

1. Copy `data/events/EXAMPLE-2024-09-sample-event/` to a new folder named
   `data/events/<YYYY-MM>-<short-name>/` (e.g. `2026-08-koshi-floods`).
2. Fill in `event.json` and the `damage_template.csv` (from `templates/`)
   with real, sourced figures — one `source_id` per figure, logged in a
   `source_citation` table per `schema/source_citation.schema.json`.
3. Make sure a matching `baseline` table exists for every ward you report
   damage for (see `data/baseline/README.md` for where to source it).
4. Run `validate_data.py` and fix anything it flags before considering the
   data publishable.
5. See `CONTRIBUTING.md` for the verification-level and sourcing rules that
   apply to every figure.

## Why not just a spreadsheet?

Because the goal is that a skeptical reader can check any published number
back to its source without asking you. That means: official P-codes instead
of place names (§3 of the methodology), a documented baseline for every
damage figure (§4), a cited source and verification level for every number
(§5–§7), and scripted, re-runnable transformations instead of manual edits
(§8). The schema and scripts in this folder exist to enforce that
mechanically, not just as a written promise.
