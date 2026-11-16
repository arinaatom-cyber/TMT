# Methods — selection, classification, and quality control

This document describes how projects enter the atlas, how they are mapped to organs, and
how the data are checked. It is the reference for the *"Why it is in the atlas /
selection criteria"* section shown in every project dossier.

## 1. Scope and inclusion criteria

A project is eligible for the catalogue when **all** of the following hold:

1. **Human** material (tissue, biofluid, primary cells, or human cell lines).
2. **TMT / TMTpro isobaric multiplexing** was used for quantification
   (TMT‑6/10/11‑plex or TMTpro‑16/18‑plex).
3. A **quantified proteome** is available (a reported number of proteins quantified
   and/or downloadable result files).
4. The dataset is **deposited in a public repository** with a stable accession
   (PRIDE `PXD…`, CPTAC/PDC `PDC…`, iProX `IPX…`, or MassIVE `MSV…`).
5. An **organ / tissue assignment** can be made from the curated metadata.

Label‑free, SILAC‑only, and non‑human datasets are out of scope. Pan‑organ atlases
(e.g. GTEx‑style, ≥ 8 organs) are included and flagged with a `PAN‑ORGAN` badge.

### Accession handling and sub‑cohorts

When a dual‑listed accession exists (e.g. `IPX… (PXD…)`), the **PXD** identifier is
used as canonical. A small number of accessions are split into analytically distinct
**sub‑cohorts** (suffixes such as `_adult` / `_pediatric`, `_CL` / `_PC`,
`_BLAST` / `_LSC` …) so that each cohort’s metadata is faithful. This means the number
of catalogue **rows** (120) can be higher than the number of unique **accessions**
because of sub-cohorts. Per‑organ counts are reported as **unique catalogue project IDs per organ**.

## 2. Data sources

| Repository | Accession prefix | Role |
|---|---|---|
| PRIDE (EBI) | `PXD` | Primary ProteomeXchange deposits |
| CPTAC / PDC | `PDC` | Cancer cohort proteogenomics |
| iProX | `IPX` | Often dual‑listed with PXD |
| MassIVE | `MSV` | Additional ProteomeXchange deposits |

The catalogue is loaded from the deployed local `data/projects.csv`. The current
loader does not fall back to a different catalogue or a Google Sheet. Displayed
fields may also incorporate matching entries from `data/proteomics_stats.json`
and `data/pdc-summary-overrides.json`; these supplemental sources are linked in
the project dossier. The proteomics-statistics loader tries the local file, then
the raw GitHub copy. Anatomical navigation uses the exact-project metadata in
`data/project-anatomy.json` as described below. These files document the sources
used by the viewer; their counting units still require the project annotations.

**Full reader dictionary (all pack columns and cell labels):** [`data/Atlas_data_dictionary.csv`](data/Atlas_data_dictionary.csv) — browsable at [dictionary.html](https://arinaatom-cyber.github.io/TMT/dictionary.html). Short catalogue notes remain in `DATA_DICTIONARY.md`.

## 3. Anatomical navigation (current implementation)

The site obtains category membership from `data/project-anatomy.json`, using
`AnatomyMapping.project` in `anatomy.js` and the **exact project record ID** from
the catalogue. Sub-cohort suffixes are part of that lookup. The current navigation
does not infer membership from tumour keywords, substrings or anatomical proximity.

Each project record provides explicit `categories` plus separate descriptions of
`measured_material`, `collection_site`, `primary_site`, `cell_line_origin` and
`uncertainty`. These fields must be interpreted separately: a primary tumour site
is not necessarily the measured collection site, and a cell-origin label does not
mean that tissue from that organ was measured. Unknown or conflicting assignments
remain explicit in the metadata; the viewer does not replace them with a guessed organ.

The embedded `terms` vocabulary supplies English/Russian display labels, entity
types and qualifications. Navigation includes anatomical sites, tissues and cell-model
groups; its category count is **not a count of independent anatomical organs**.
The source field `Organ` in `projects.csv` remains available as catalogue metadata,
but is not the current membership classifier.

### Validation and interpretation limits

At load time, `AnatomyMapping.validate` checks valid category keys, non-empty and
non-duplicated project category arrays, references to defined terms, and equality
of the exact project-ID sets in the anatomical file and catalogue. These are
structural consistency checks, not an independent revalidation of every original
publication. Per-record evidence and uncertainty are retained in the anatomical file.

A project may appear under several navigation tags. Its full matrix is not split
into organ-specific samples by those tags; use the project's Annotation to select
the relevant measurement columns. Do not count repeated appearances as independent
studies or assume that every protein in a multi-site project was measured in every site.

The category protein index is accepted only when its `anatomy_sha256` matches the
SHA-256 digest of the loaded anatomical file and its `scope` is
`complete_project_matrices` (`proteins.js`, `anatomyIndexCompatible`). It therefore
describes coverage of complete project matrices associated with a category, not a
sample-filtered organ proteome. The checksum establishes version compatibility;
it does not establish biological specificity.

## 4. Cancer vs normal

A row is classified **normal** only when no cancer keyword appears in the tumour type,
disease, or title fields (`carcinoma`, `cancer`, `tumor/tumour`, `sarcoma`,
`leukemia`, `lymphoma`, `melanoma`, `glioma/glioblastoma`, `metastasis`, …) **and** the
tumour type is empty/normal/healthy.

## 5. Patient and sample counts

Two distinct quantities are surfaced and must not be conflated:

- **Patients / donors** — biological individuals (0 for pure cell‑line studies).
- **Total samples** — analysed specimens. ⚠️ For some deposits this field reflects
  **TMT channels / files** rather than biological samples, so Σ‑sample totals are
  **approximate**. The dossier shows the raw values per project.

## 6. Quality control / audit

The catalogue is checked for:

- **Count invariant** — per‑organ count equals the number of unique project IDs mapped
  to that organ (verified in‑app at load).
- **Duplicate accessions** — no duplicate canonical IDs.
- **Field sanity** — flags `Total Samples = 0` with non‑zero patients, and
  `patients > samples` cases for manual review.
- **Source ↔ site parity** — the bundled `projects.csv` is aligned with curated Atlas packs (`*_summary.csv`).
- **Result‑file parity** — `scripts/` re‑derive protein counts from result files and
  compare against the reported `Proteins Quantified`.

Helper scripts: `scripts/recount-project-stats.py`, `scripts/audit-result-files.py`,
`scripts/verify-project-proteins.py`, `scripts/audit-proteome.py`.

## 7. Anatomical references

The body is drawn to scale from a documented adult female reference (≈165 cm,
~4.1 px/cm); male parameters are provided for comparison. Organ sizes/masses are
*central atlas references* (CAP organ‑weight tables, Radiopaedia/Radiology Key,
Cleveland Clinic/StatPearls, NLM Visible Human Project) and are **not** diagnostic
norms. Full citations are in the site’s *Literature & sources* section.
