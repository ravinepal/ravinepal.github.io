# Changelog

Append-only. Corrections to published figures are recorded here rather than
edited silently in place — see `CONTRIBUTING.md`.

## 2026-08-31 — v0.1: Framework and schema release

- Initial methodology (`METHODOLOGY.md`) covering administrative framework,
  baseline and damage data sources, data model, verification rules,
  aggregation rules, ethics, and publishing plan.
- JSON Schemas for `admin_boundary`, `baseline`, `damage_record`, and
  `source_citation` (`schema/`).
- CSV templates matching each schema (`templates/`).
- `scripts/validate_data.py` (schema + sanity-check validation) and
  `scripts/aggregate.py` (ward → local level → district → province roll-up).
- `data/events/EXAMPLE-2024-09-sample-event/` — a small, clearly-labeled
  **mock** dataset used to demonstrate the format and exercise the scripts.
  Not real damage data; no real event has been added yet.

### Corrections

_None yet._
