# Methodology: Ward-Level Flood Damage Assessment for Nepal

Status: **Draft v0.1** — framework and schema defined; not yet populated with a
real event. See `CHANGELOG.md` for version history.

## 1. Purpose

Publish, for any Nepal flood event, a **ward-level** picture of:

- what existed before the flood (baseline: population, households, houses,
  schools, health facilities, roads, businesses, etc.), and
- what was damaged or lost (impact: counts of the same categories affected),

in a way a skeptical reader — a journalist, a researcher, a local official —
can independently check line by line: every number traces back to a named
source, a retrieval date, and (where the transformation isn't trivial) a
script that produced it.

This document is the contract for how that data is collected, structured,
verified, and published. It applies to every event folder under
`data/events/`.

## 2. Guiding principles

1. **Lowest feasible administrative unit.** Nepal's ward is the smallest
   statutory administrative unit with an official boundary and code. Always
   report and store at ward level; aggregate upward for summaries, never the
   reverse.
2. **Official identifiers, not place names.** Every record is keyed by
   official P-code (see §3), never by free-text ward/village names. Names are
   ambiguous (duplicates across districts) and unstable (renamed palikas);
   P-codes are not.
3. **Baseline before impact.** No damage figure is published for a ward
   without a baseline figure for the same indicator in the same ward. A
   damage count with no denominator is not comparable and will not be
   published as a rate.
4. **Provenance over completeness.** A missing, clearly-marked "no data" cell
   is preferable to a filled cell without a traceable source. Never
   backfill silently.
5. **Do no harm.** No personally identifiable information. Casualty figures
   are aggregate counts from official sources only (§5, §9).
6. **Reproducibility over convenience.** All transformations are scripts
   checked into this repo (`scripts/`), not manual spreadsheet edits. Anyone
   should be able to re-run the pipeline from raw sources to published output.
7. **This is an independent civic-data project**, not an official Government
   of Nepal dataset, unless a specific figure is directly and explicitly
   sourced to one (in which case it is cited as such).

## 3. Administrative framework

Nepal's federal structure, from largest to smallest:

| Level | Count (post-2017 restructuring) | Example |
|---|---|---|
| Province (Pradesh) | 7 | Bagmati Province |
| District (Jilla) | 77 | Kathmandu |
| Local Level / Palika (Metropolitan/Sub-metropolitan/Municipality/Rural Municipality) | 753 | Kathmandu Metropolitan City |
| **Ward** (lowest statutory unit) | 6,743 | Ward No. 10 |

All four levels have official P-codes. Use the boundary set and P-code
scheme published as Nepal's **Common Operational Dataset — Administrative
Boundaries (COD-AB)** on the UN OCHA Humanitarian Data Exchange (HDX), which
in turn derives from NDRRMA / Survey Department sources. Do not hand-draw or
re-derive boundaries.

`data/admin-boundaries/README.md` explains how to obtain and version this
boundary set; it is not vendored in this repo (large geospatial files,
subject to updates — link + checksum instead of a copy, per §8).

Every baseline and damage record in this project carries an
`adm4_pcode` (ward) column, plus the parent `adm3_pcode` / `adm2_pcode` /
`adm1_pcode` for convenience, all populated by joining against the COD-AB
reference table — never typed by hand.

## 4. Baseline data: what existed before the flood

Baseline indicators, by sector, with the authoritative source for each:

| Sector | Indicators | Source |
|---|---|---|
| Population & housing | Population, households, houses by construction/roof/wall material | National Population and Housing Census 2021, National Statistics Office (NSO) |
| Economy | Number of establishments (businesses), persons engaged, by ward | National Economic Census 2018, NSO |
| Education | Number of schools, by level, enrollment | Flash Report / school census, Ministry of Education, Science and Technology (MoEST) / Department of Education |
| Health | Number of health facilities, by type | Health Management Information System (HMIS) facility registry, Department of Health Services (DoHS) |
| Roads | Length by class (strategic/local), surface type | Department of Roads (strategic network); Department of Local Infrastructure / Palika inventories (local roads); OpenStreetMap for geometry where official inventories lack it (flagged as such) |
| Bridges & irrigation | Counts | Department of Local Infrastructure; Department of Irrigation |
| Agriculture (optional, event-dependent) | Cropland area, livestock counts | Ministry of Agriculture and Livestock Development statistics |

Construction-material breakdown of housing (from Census 2021) is retained
because it is the standard vulnerability proxy used in Nepal disaster
assessments (e.g., mud-bonded vs. RCC-frame housing has very different
flood/earthquake vulnerability) — it lets a reader sanity-check whether a
reported damage rate is plausible for that ward's housing stock.

Every baseline figure is a snapshot as of its source's reference date (e.g.,
Census 2021 reference date), recorded in the `as_of_date` field — baselines
are not adjusted for time elapsed since the census unless a more recent
official update exists and is cited.

## 5. Damage / impact data: what was affected

Ranked by evidentiary weight (§7 uses this ranking for verification level):

1. **Official government sources** — NDRRMA's BIPAD Portal (ward-level
   incident and loss reports), National Emergency Operations Center (NEOC)
   daily situation reports, Ministry of Home Affairs, District/Palika
   disaster reports submitted to NDRRMA.
2. **Sector cluster assessments** — when the humanitarian cluster system
   activates: Shelter Cluster, Education Cluster, WASH Cluster damage/needs
   reports.
3. **Joint/rapid assessments** — a Post-Disaster Needs Assessment (PDNA),
   when one is conducted, following the Government of Nepal National
   Planning Commission / GFDRR / World Bank PDNA methodology.
4. **Remote-sensing corroboration** — UNOSAT or Copernicus Emergency
   Management Service rapid mapping products, used only to corroborate
   ground-reported figures, never as the sole source for a published number.
5. **Verified media** — a report from a named outlet with an identifiable
   named source (official quoted, on-the-record), used only to corroborate.

**Explicitly excluded as a primary source:** unverified social media posts,
uncorroborated crowd reports. If such a lead is worth tracking, it goes in a
separate `unverified_leads` log (not the published `damage_record` table)
clearly flagged as unverified pending official confirmation — it is never
merged into published figures.

## 6. Data model

See `schema/` for the machine-readable JSON Schemas; summary below.

**`baseline` record** (one row per ward per indicator): `adm4_pcode`,
`indicator` (e.g. `households_total`, `schools_total`,
`houses_mud_bonded`), `value`, `unit`, `as_of_date`, `source_id`
(→ `source_citation`).

**`damage_record`** (one row per ward per event per indicator):
`event_id`, `adm4_pcode`, `indicator` (e.g. `houses_destroyed`,
`houses_partially_damaged`, `deaths`, `displaced_persons`,
`schools_damaged`, `road_km_damaged`, `businesses_damaged`), `value`, `unit`,
`report_date`, `source_id`, `verification_level`
(`verified_official` | `cluster_estimate` | `media_corroborated` |
`unverified`), `confidence_note` (free text, e.g. "district total only,
not yet disaggregated to ward").

**`source_citation`** (shared registry): `source_id`, `title`, `publisher`,
`url_or_reference`, `retrieved_date`, `access_note` (e.g. "PDF on file,
publisher site since removed").

Human-impact indicators (`deaths`, `missing`, `injured`) are recorded as
**aggregate counts per ward only**, sourced solely from official government
reports (§5, rank 1) — never independently estimated, and never with any
name, age, address, or photo attached (§9).

## 7. Normalization & aggregation

- **Damage rate** = damage `value` ÷ baseline `value` for the matching
  indicator and ward, expressed as a percentage. Always published alongside
  both raw numbers (never the rate alone) so the denominator is auditable.
- **Per-capita rate** (e.g., displaced persons per 1,000 population) is used
  for cross-ward comparison, since raw counts are not comparable across
  wards of very different size.
- **Roll-up (ward → local level → district → province):**
  - Count indicators (houses destroyed, deaths, schools damaged, etc.):
    simple sum of children.
  - Rate/percentage indicators: recompute from summed numerator and
    denominator at the parent level — never average child percentages
    (averaging percentages across unevenly-sized wards is a common,
    misleading error).
  - Roll-up path is read from the COD-AB admin hierarchy (§3), not
    hand-maintained.
- **Missing vs. zero.** A ward with no damage record for an indicator is
  `no data`, not `0`. A ward with a reported and sourced value of zero is
  `0`. These render and aggregate differently: `no data` wards are excluded
  from a sum and the exclusion is noted (e.g. "12 of 15 wards reporting"),
  never silently treated as zero.

`scripts/aggregate.py` implements exactly these rules — see §8.

## 8. Reproducibility engineering

- Raw source files are either linked (URL + retrieval date, when
  redistribution isn't permitted) or vendored with a checksum, recorded in
  `source_citation`. Never referenced only by memory of "I saw it somewhere."
- All cleaning, P-code joining, and aggregation is code in `scripts/`, run
  against the CSVs in `data/`. No published number should require a manual
  spreadsheet edit that isn't captured by a script or a raw-source citation.
- `scripts/validate_data.py` validates every `baseline` and `damage_record`
  CSV against its JSON Schema before anything is considered "published,"
  and runs the sanity check that damage does not exceed baseline for the
  same ward/indicator (flags, does not silently drop, violations — a
  baseline can itself be an undercount, so this is a flag for review, not
  an automatic rejection).
- Every release of an event's data is dated. Corrections are appended to
  `CHANGELOG.md` and, where a published number changes, the old and new
  values are both recorded there — published data is never silently
  overwritten in place.

## 9. Ethics and do-no-harm

- No names, photographs, exact addresses, or other personally identifying
  detail about affected individuals.
- Death/missing/injured counts are aggregate, ward-level, and sourced only
  from official government reporting (§5 rank 1) — this project does not
  independently determine or estimate casualty figures.
- Every published page/table carries the disclaimer: *"Independent civic
  data project — not an official Government of Nepal publication. See
  Sources for the origin of each figure."*
- A corrections channel is documented in `CONTRIBUTING.md` for anyone —
  including affected communities or local officials — to flag an inaccuracy.

## 10. Publishing plan (advisory — not built in this scaffold)

Recommended path once a real event's data is populated and validated:

1. **Static per-admin-unit pages**, generated from the validated CSVs by a
   build script into plain HTML/Markdown pages under the main Jekyll site
   (e.g. one page per district, tables down to ward level) — fits the
   existing GitHub Pages/Jekyll hosting with no backend.
2. **Interactive choropleth map**: Leaflet.js loading the ward GeoJSON
   (from COD-AB) plus the published CSV, colored by a chosen indicator
   (e.g. % houses damaged), with a per-ward popup showing baseline, damage,
   and rate together. This is static (a prebuilt GeoJSON + a page of JS),
   so it also needs no backend.
3. **Downloadable data package**: publish the validated CSVs plus a
   `datapackage.json` (Frictionless Data spec) so researchers can pull the
   underlying data directly rather than scraping the site.
4. Consider whether a summary belongs on Code for Nepal's channels if it
   fits their editorial mission — this project sits naturally adjacent to
   that work.

## 11. Update cadence and snapshot maturity

Publish dated snapshots, each explicitly labeled with a maturity level —
never present one evolving number as if it were final:

| Snapshot | Timing | Sources used | Label |
|---|---|---|---|
| Rapid | ~T+72 hours | Official sources only (NEOC/BIPAD) | "Rapid assessment — preliminary, official sources only" |
| Verified | ~T+2–4 weeks | Adds cluster assessments / PDNA where conducted, triangulated | "Verified assessment — see Sources" |
| Final (if applicable) | Post-PDNA or post-recovery reporting | Full PDNA / final government figures | "Final assessment" |

Each event's `event.json` records which snapshot stage its current data
represents.
