# August 2026 Rasuwa / Trishuli corridor floods

**Status: rapid / provisional. This is a real event, but it does not yet meet
this project's publishing bar (METHODOLOGY.md).** Read this whole file before
using anything here, and see `event.json`'s `notes` field for the summary.

## What's real here

- The event itself: a flash flood on 26 August 2026 in Rasuwa district,
  Bagmati Province, along the Trishuli river corridor, reportedly triggered
  by a glacier collapse on Langtang Lirung.
- The ward references in `admin_boundary_provisional.csv`: Timure (Ward 2)
  and Syabrubesi (Ward 5), both in Gosaikunda Rural Municipality, Rasuwa —
  each traced to a specific source in `source_2026-08-rasuwa.csv`.
- The national-context figures in `event.json` (deaths, missing, affected
  persons, hydropower/solar projects damaged) — real figures, but explicitly
  **national or multi-district totals**, not specific to Rasuwa, Timure, or
  Syabrubesi.

## What's NOT here, and why

- **No ward-level `damage_record` rows.** `damage_2026-08-rasuwa.csv`
  contains only the header row, zero data rows. Every source reachable in
  this session (see the access notes in `source_2026-08-rasuwa.csv`) gave
  national or corridor-wide totals only — never a Rasuwa-specific, let alone
  ward-specific, breakdown. Putting the national death/missing/affected
  totals into a row keyed to Timure's or Syabrubesi's `adm4_pcode` would
  misattribute a national toll to two named wards. `METHODOLOGY.md` section 7
  ("no data" vs. "zero reported", never silently impute) forbids exactly
  this, so those rows are simply absent rather than wrong.
- **No baseline data.** No pre-flood population/housing/school/business
  baseline for Timure or Syabrubesi has been sourced yet — see
  `data/baseline/README.md` for how to get it (Census 2021, ward level).
- **No official P-codes.** Every pcode in `admin_boundary_provisional.csv`
  is a placeholder (`PENDING-CODAB-...`), not a real Nepal P-code. This
  session could not reach `data.humdata.org` (Nepal's official COD-AB
  boundary set) — every attempt returned a network-policy block (403 on the
  connection itself, confirmed with multiple tools, not just an unlucky
  retry). Real P-codes must replace these before this event is
  publishable — the placeholders exist only to keep the folder's shape
  consistent with a real event, not to be mistaken for official codes.
- **Rasuwagadhi is intentionally omitted** from `admin_boundary_provisional.csv`
  even though it's named repeatedly in reporting (the border checkpoint and
  Miteri Bridge there were reportedly destroyed) — the sources found in this
  session disagree on which ward it's in. Guessing would defeat the point of
  using official P-codes as join keys.
- **The 903 deaths / 4,247 missing / 50,000 affected figures are 5 days old
  relative to the event** (as of this data's `retrieved_date`) and will
  almost certainly change as search-and-rescue continues. Treat them as a
  snapshot, not a final toll.

## Exactly what would upgrade this to real, publishable data

1. **Get Nepal's official COD-AB ward boundaries** (`data/admin-boundaries/README.md`)
   and swap the real P-codes into `admin_boundary_provisional.csv` (rename
   it once real) — this resolves the placeholder-pcode problem and lets you
   confirm or correct the Timure/Syabrubesi ward numbers and add Rasuwagadhi.
2. **Get the HDX `hot_flood_npl` and `hot_flood_npl_buildings_damage`
   datasets** (blocked from this session, reachable from a normal browser)
   and any NDRRMA BIPAD Portal ward-level incident data, NRCS Rasuwa flood
   situation updates, or the `rasuwa-flood-bulletin` site Ravi flagged — any
   of these could supply the missing ward-level breakdown.
3. **Get ward-level Census 2021 baseline** for Timure and Syabrubesi
   (`data/baseline/README.md`) so any damage figure you add has a
   denominator.
4. Populate real rows in `damage_2026-08-rasuwa.csv` from those sources,
   each with a real `source_id` in an expanded `source_2026-08-rasuwa.csv`
   and an honest `verification_level` (see `CONTRIBUTING.md`).
5. Run `python scripts/validate_data.py data/events/2026-08-rasuwa-floods`
   and resolve everything it flags.
6. Log the upgrade in `CHANGELOG.md` per the corrections process.
