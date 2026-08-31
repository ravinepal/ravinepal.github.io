# Administrative boundaries

This project uses Nepal's official ward (adm4) boundaries and P-codes as the
join key for every baseline and damage record (see `METHODOLOGY.md` §3).
Boundary files are not vendored in this repo — they are large, geometry-
heavy, and periodically revised, so we link + checksum rather than copy.

## Recommended source

**UN OCHA Humanitarian Data Exchange (HDX) — Nepal Common Operational
Dataset, Administrative Boundaries (COD-AB)**
<https://data.humdata.org/dataset/cod-ab-npl>

This is the standard reference set used across humanitarian and government
reporting for Nepal and includes all four admin levels (province, district,
local level, ward) with official P-codes, derived from NDRRMA / Survey
Department sources.

## How to add a release

1. Download the shapefile/GeoJSON release from HDX.
2. Record it as a `source_citation` entry (title, publisher, URL, retrieved
   date) — give it a `source_id` such as `codab-npl-2024-01`.
3. Extract the adm1–adm4 P-code and name columns into a CSV matching
   `schema/admin_boundary.schema.json`, with `boundary_source_id` set to
   that `source_id`. Save it here as e.g. `codab-npl-2024-01.csv`.
4. Note the checksum (`sha256sum <file>`) of the downloaded release in
   `CHANGELOG.md` so a later re-download can be verified against it.

Do not hand-edit P-codes or names — if a boundary looks wrong, get a newer
COD-AB release rather than patching the CSV.
