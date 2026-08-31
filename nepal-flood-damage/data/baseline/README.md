# Baseline data sourcing

Baseline indicators (what existed before a flood) come from different
authoritative sources per sector — see `METHODOLOGY.md` §4 for the full
table and rationale. Quick pointers for sourcing each:

| Indicator group | Source | Where to get it |
|---|---|---|
| Population, households, housing construction type | National Population and Housing Census 2021 | National Statistics Office (NSO): <https://censusnepal.cbs.gov.np/> |
| Businesses / establishments | National Economic Census 2018 | NSO: <https://censusnepal.cbs.gov.np/> |
| Schools, enrollment | Flash Report / school census | Ministry of Education, Science and Technology (MoEST) / Department of Education / Centre for Education and Human Resource Development (CEHRD) |
| Health facilities | HMIS facility registry | Department of Health Services (DoHS): <https://dohs.gov.np/> |
| Roads (strategic) | Road network inventory | Department of Roads: <https://www.dor.gov.np/> |
| Roads (local), bridges | Local infrastructure inventory | Department of Local Infrastructure |
| Irrigation | Irrigation structure inventory | Department of Irrigation |
| Agriculture (optional) | Agricultural statistics | Ministry of Agriculture and Livestock Development |

## Process

1. Download the source table at the finest disaggregation it publishes
   (ideally ward level; Local Level if that's the finest available — note
   this in the baseline row's `note` field per `schema/baseline.schema.json`
   if it isn't ward-level).
2. Record it as a `source_citation` entry.
3. Reshape into rows matching `schema/baseline.schema.json`, joined to
   `adm4_pcode` via the admin boundary reference (`data/admin-boundaries/`).
4. Save as `data/baseline/<indicator-group>.csv`, shared across events
   (baseline data is not event-specific — a single up-to-date baseline set
   is referenced by every event folder).
5. Run `python scripts/validate_data.py data/baseline` to check the schema.

No real baseline data is included in this scaffold yet — this is the first
task for populating a real event (see the root `README.md`'s "Adding a real
event" section).
