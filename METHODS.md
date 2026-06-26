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
of catalogue **rows** (123) is slightly higher than the number of unique **accessions**
(121). Per‑organ counts are reported as **unique catalogue project IDs per organ**.

## 2. Data sources

| Repository | Accession prefix | Role |
|---|---|---|
| PRIDE (EBI) | `PXD` | Primary ProteomeXchange deposits |
| CPTAC / PDC | `PDC` | Cancer cohort proteogenomics |
| iProX | `IPX` | Often dual‑listed with PXD |
| MassIVE | `MSV` | Additional ProteomeXchange deposits |

The live catalogue is maintained in Google Sheets and exported to `data/projects.csv`,
which the site loads (local file first, then the raw GitHub copy, then the Sheet as a
fallback). See `DATA_DICTIONARY.md` for column definitions.

## 3. Organ classification (how matching works)

Organ assignment is **deterministic and keyword/substring based**:

1. The curator **`Organ`** column is authoritative. It is split on `;`, `,` and
   newlines into parts.
2. Each part is matched against a controlled dictionary, first by **exact** lookup,
   then by longest **substring** match (e.g. `gastric → Stomach`, `glioma → Brain`,
   `renal → Kidney`).
3. If the `Organ` column is empty, the classifier falls back to cell‑line/tissue
   columns and finally to regex **hints** from free text (e.g. `MCF‑7 → Breast`).
4. Rows resolving to **≥ 3 organs** are additionally tagged `Multiple Organs`; rows
   with **≥ 8 organs** are flagged as pan‑organ.

### Documented proxy mappings

Some source labels are anatomical regions rather than single organs; they are mapped to
the nearest organ available on the map. Reviewers should be aware of these:

| Source label | Mapped to | Rationale |
|---|---|---|
| Head and neck / Oral cavity | Salivary gland | nearest mapped head‑and‑neck site |
| Gastrointestinal | Large intestine (Colon) | dominant GI proteomics tissue |
| Orbit | Eye | orbital region |
| Placenta | Uterus | female reproductive proxy |
| Tonsil | Lymph node | lymphoid tissue |
| Pleura | Lung | thoracic proximity |

### Metastasis handling

For multi‑organ strings from autopsy/metastasis studies, the primary tumour organ is
kept and obvious distant‑metastasis organs are trimmed where the primary is
unambiguous (e.g. lung‑adenocarcinoma autopsy → not counted as a liver project). Small
organ counts (e.g. adrenal, spleen) may still include metastatic‑site tissue; this is
disclosed in the project dossier’s **Data caveats**.

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
- **Source ↔ bundle parity** — the bundled `projects.csv` is periodically diffed
  against the live Google Sheet; known divergences are tracked.
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
