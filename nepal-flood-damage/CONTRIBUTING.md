# Contributing / Sourcing Rules

This project only publishes what can be sourced and checked. These rules
apply to every figure added under `data/`.

## Every figure needs

1. A `source_id` pointing to an entry in that event's `source_citation`
   table (`schema/source_citation.schema.json`), giving: title, publisher,
   URL or reference, and the date it was retrieved.
2. A `verification_level`:
   - `verified_official` — from an official Government of Nepal source
     (NDRRMA/BIPAD, NEOC, MoHA, a Palika/DCC report), or corroborated by
     two independent sources.
   - `cluster_estimate` — from a sector cluster assessment (Shelter/
     Education/WASH) or a PDNA that hasn't yet been cross-confirmed against
     a second source.
   - `media_corroborated` — a verified media report citing a named,
     on-the-record official source, used only where no official figure
     exists yet.
   - `unverified` — anything else. Figures at this level are logged
     separately (see below) and are **not** included in published totals
     or rates.
3. A `report_date` (for damage) or `as_of_date` (for baseline) — the date
   the underlying figure was collected or is valid as of, not the date you
   entered it into this repo.

## What never gets published

- Names, photographs, exact home addresses, or any other personally
  identifying detail about an affected individual.
- A casualty figure (deaths/missing/injured) from anything other than an
  official government source.
- A damage figure with no corresponding baseline figure for the same ward
  and indicator (see `data/baseline/`).
- An `unverified`-level figure merged into a published `damage_record`
  table. Keep unverified leads in a separate, clearly-labeled log
  (e.g. `unverified_leads.csv` in the event folder) so they're visible but
  not counted.

## Adding a new event

1. Copy `data/events/EXAMPLE-2024-09-sample-event/` to
   `data/events/<YYYY-MM>-<short-name>/`.
2. Fill in `event.json`, the baseline references, the `damage_template.csv`,
   and the source citation table.
3. Run `python scripts/validate_data.py data/events/<your-event>` and
   resolve every error (schema violations) and review every warning
   (e.g. damage exceeding baseline for a ward — investigate before
   publishing; it may mean the baseline itself is an undercount, or a
   data-entry mistake).
4. Note the event and its initial snapshot maturity level (§11 of
   `METHODOLOGY.md`) in `CHANGELOG.md`.

## Corrections

Corrections are **appended**, never made by silently editing a published
value in place:

1. Fix the CSV.
2. Add a line to `CHANGELOG.md` under a `### Corrections` heading for that
   date, stating: which file/row/indicator changed, the old value, the new
   value, and why (new source, error found, etc.).
3. Re-run `validate_data.py`.

If you are a member of an affected community, a local official, or anyone
else who has spotted an inaccuracy: please open an issue on this repository
describing the ward (by name and, if known, P-code), the indicator, and what
you believe the correct figure is and why. Every correction is logged per
the process above, not silently applied.
