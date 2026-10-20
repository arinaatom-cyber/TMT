# TMT Atlas: data files and dictionary

## Files in each project folder

| File | What it contains |
|------|------------------|
| `<ID>_summary.csv` | Study overview: counts, links, instrument, design (column A = field name, column B = value). |
| `<ID>_annotation.csv` | One row per TMT channel (one quantitative profile). |
| `<ID>_result.csv` | Protein abundances; link to the sample table via **Column name**. |
| `<ID>_patients.csv` or `_samples.csv` | Patient or specimen clinical data (when available). |
| `result_<ID>.xlsx` | Same tables in one workbook: **Summary**, **Annotation**, **Result**, **Samples**. |

Downloaded column titles are plain English and match the **Column header** column in the dictionary (`Protein IDs`, `Sample type`, `Case submitter ID`, …).

## Data dictionary (English)

| File | Role |
|------|------|
| **`Atlas_data_dictionary.csv`** | Complete reader dictionary (one row per standard term). |
| **`Atlas_data_dictionary.xlsx`** | Same content with tabs per table type. |
| **`Atlas_projects_catalog_values.csv`** | Distinct values per column in the 120-row organ-map table (`projects.csv`). |
| **`Atlas_result_vocabulary.csv`** | Result-matrix header patterns and rare author-specific columns. |

### Excel tabs

| Tab | Covers (exact file / table) |
|-----|-----------------------------|
| **Summary** | Every row label in `<ID>_summary.csv` |
| **Annotation** | Every column in `<ID>_annotation.csv` |
| **Result** | Identifier columns in `<ID>_result.csv` + note on quantitative columns |
| **Patients** | Columns in `<ID>_patients.csv` / `<ID>_samples.csv` |
| **Workbook** | How `result_<ID>.xlsx` sheets map to the CSV files |
| **Master_table** | All **48** columns in `projects.csv` (headers spelled exactly as in the file) |
| **Glossary** | Controlled cell labels (`Not Reported`, `Log Ratio`, …) |
| **Sample_type** | Allowed **Sample type** values after Atlas harmonization |
| **TMT_science** | TMT chemistry, repositories, protein IDs |
| **Result_vocabulary** | Quantitative header suffixes and non-standard columns |

Each row: **Column header** | **Definition** | **Source** | **Example** (reference study **PDC000110** unless noted).

**Counts:** `Total Samples`, `Case Cancer Untreated`, `Case Cancer Treated`, `Control Healthy`, `preCancer`, and `Healthy_treated` count **TMT channels (profiles)**, not unique patients. **`Patients / donors`** counts people and may differ from `Total Samples`.

## Organ map

The interactive map and `data/projects.csv` list one row per study (120 projects). Numbers align with each `<ID>_summary.csv` when both are complete.
