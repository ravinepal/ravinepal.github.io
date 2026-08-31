# EXAMPLE event — for format demonstration only

**Every number in this folder is invented.** It exists solely to show the
file format described in `METHODOLOGY.md` and to give `scripts/validate_data.py`
and `scripts/aggregate.py` something concrete to run against. It is not a
real flood, not a real place, and not a real damage figure. The P-codes
(`MOCK-...`) are deliberately not valid Nepal P-codes so they can never be
mistaken for real administrative units.

Do not copy the numbers. Copy the **structure** when adding a real event:
see the root `README.md`'s "Adding a real event" section and
`CONTRIBUTING.md` for the sourcing rules a real event must follow.

## Files

- `event.json` — event metadata
- `admin_boundary_sample.csv` — a fictitious 3-ward hierarchy (Province →
  District → Local Level → Ward), standing in for a real COD-AB extract
- `baseline_sample.csv` — fictitious pre-event baseline figures for the 3 wards
- `damage_sample.csv` — fictitious post-event damage figures for the 3 wards
- `source_sample.csv` — fictitious source citations (none of these URLs/
  reports should be treated as real)

## Try it

```bash
cd nepal-flood-damage
python scripts/validate_data.py data/events/EXAMPLE-2024-09-sample-event
python scripts/aggregate.py data/events/EXAMPLE-2024-09-sample-event --level adm3
python scripts/aggregate.py data/events/EXAMPLE-2024-09-sample-event --level adm2
```
