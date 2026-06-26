# Data dictionary — `data/projects.csv`

One row = one project (or analytically distinct sub‑cohort). Columns are free‑text as
curated from repository metadata and publications unless noted. Fields surfaced in the
in‑app **project dossier** are marked ★.

## Identity & source

| Column | Description |
|---|---|
| `Database` | Source repository (PRIDE, CPTAC/PDC, IProX, MassIVE, …). ★ |
| `Project ID` | Canonical accession (`PXD…`, `PDC…`, `IPX… (PXD…)`, `MSV…`); PXD preferred when dual‑listed. May carry a sub‑cohort suffix. ★ |
| `PMID` | PubMed ID of the source article. ★ (links to PubMed) |
| `Title` | Title of the source publication. ★ |
| `URL` | Repository landing page for the deposit. ★ (DB link) |

## Cohort composition

| Column | Description |
|---|---|
| `Total Samples` | Number of analysed specimens. ⚠️ Sometimes reflects TMT channels/files. ★ |
| `preCancer` | Count of pre‑cancerous / dysplastic samples (if reported). |
| `Case Cancer Untreated` | Cancer cases sampled before treatment. ★ |
| `Case Cancer Treated` | Cancer cases sampled after/with treatment. ★ |
| `Control Healthy` | Healthy/normal control samples. ★ |
| `Healthy Treated` | Healthy samples under an intervention (rare). |
| `Patients / donors` | Number of biological individuals (0 for cell‑line studies). ★ |
| `Samples Original N` | Samples originally acquired. |
| `Samples Used N` | Samples retained for the final analysis. ★ |

## Biological annotation

| Column | Description |
|---|---|
| `Tissue Cell Type Detailed` | Detailed free‑text tissue/cell description. |
| `Sample Type` | Normalised material type (Tissue, FFPE, LCM, Cell Lines, PBMC, Plasma, …). ★ |
| `Tissue` | Tissue as reported. |
| `Organ` | **Authoritative** organ field used for map classification (see `METHODS.md`). ★ |
| `Tumor Type` | Tumour type / disease as reported. ★ |
| `Cell Line Name` | Cell line(s) profiled, if applicable. |
| `Cell Line Cancer;Normal` | Cancer/normal status of cell lines. |
| `Cell Line Organ` | Organ of origin for cell lines. |
| `Tumor type for cell lines` | Tumour type for cell‑line panels. |
| `Tissue for cell lines` | Tissue of origin for cell lines. |
| `Disease` | Disease label. |
| `Disease Subtype` | Disease subtype / stratification. |

## Study description

| Column | Description |
|---|---|
| `Experimental Design` | Design summary (comparison structure, batches). ★ |
| `Short Description` | Abstract‑style summary of the study. ★ |
| `Main_Finding` | Key result of the source article. ★ |
| `Data_Caveats` | Known limitations / caveats for interpretation. ★ |

## Acquisition & quantification

| Column | Description |
|---|---|
| `Platform MS (Unified)` | Mass spectrometer / platform. ★ |
| `TMT Label (Unified)` | Normalised TMT label (e.g. `TMT 10-plex`, `TMTpro 16-plex`). ★ |
| `Proteins Quantified` | Number of proteins quantified. ★ |
| `TMT Channels Used` | Channel layout / sample‑to‑channel mapping. ★ |
| `TMT Channels Comparison` | Comparison structure across channels. |
| `TMT Additional Channels` | Bridge / reference channels. |
| `Normalization Strategy` | Normalisation method. ★ |
| `Z-Score Level` | Level at which z‑scoring was applied (if any). |
| `Z-Score Scope` | Scope of z‑scoring (within‑batch, global, …). |
| `FASTA (Unified)` | Sequence database used for searching. ★ |
| `FASTA Year` | Version/year of the FASTA. ★ |
| `Modifications` | Fixed/variable modifications. ★ |
| `FDR (Unified %)` | False discovery rate threshold. ★ |
| `Quantification_Format` | Reported quantitative value type (ratio, intensity, z‑score…). ★ |

## Files

| Column | Description |
|---|---|
| `Result Files` | Result file name(s) parsed for the protein index. ★ (GitHub results link) |

---

### Normalisation rules applied by the app

- **TMT label** — `TMT-10-plex`, `TMT 10 plex` → `TMT 10-plex` (single bucket).
- **Sample type** — collapses variants (`Cell line/Cell lines` → `Cell Lines`, etc.).
- **Disease** — grouped to canonical labels (e.g. `NSCLC` → `Lung cancer`).
- **Accession** — `IPX… (PXD…)` → `PXD…`.

See `METHODS.md` for the full classification and QC logic.
