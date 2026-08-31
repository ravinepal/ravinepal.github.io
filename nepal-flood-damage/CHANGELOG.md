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

## 2026-08-31 — Add real event: August 2026 Rasuwa floods (rapid/provisional)

- Added `data/events/2026-08-rasuwa-floods/`: the real August 2026 Rasuwa
  district / Trishuli corridor floods.
- Populated: confirmed ward references for Timure (Ward 2) and Syabrubesi
  (Ward 5), both Gosaikunda Rural Municipality, Rasuwa, Bagmati Province,
  each cited to a specific source; national/multi-district context figures
  (903 deaths, 4,247 missing, 50,000+ affected, 14 hydropower/solar projects
  damaged) recorded in `event.json` as explicitly non-disaggregated context.
- **Not** populated: any ward-level `damage_record` row. Every source
  reachable in this session (WebSearch snippets only — `data.humdata.org`,
  `reliefweb.int`, `icimod.org`, `nrcs.org`, `en.wikipedia.org`, and a
  third-party bulletin site were all blocked by this session's network
  egress policy, confirmed via both the fetch tool and raw `curl`) gave only
  national or multi-district aggregate figures, never a Rasuwa-specific or
  ward-specific breakdown. Attributing the national totals to Timure or
  Syabrubesi would have misattributed a national toll to two named wards,
  which METHODOLOGY.md section 7 prohibits — so those rows are left absent
  rather than filled with a misattributed number. All P-codes in this event
  are `PENDING-CODAB-*` placeholders for the same reason (COD-AB boundary
  set unreachable this session). See that folder's `README.md` for the exact
  steps to upgrade it to real, ward-level, `verified_official` data.
- `python scripts/validate_data.py data/events/2026-08-rasuwa-floods` passes
  (schema-valid) — noted in that event's README that schema-valid is not the
  same as meeting the "verified_official" publishing bar.
