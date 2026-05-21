# Project result files (main storage)

**All project folders live in a separate repository:**

https://github.com/arinaatom-cyber/tmt-projects/tree/main/Projects

The web atlas links there automatically (`Projects/<Project ID>/`).

This `projects/` folder in the **TMT** repo is only a small demo fallback (e.g. PXD005410).

## Supported file types for protein lists in the browser

- `proteinGroups.txt` (MaxQuant)
- `proteins_table.txt`
- Names from column **Result Files** in Google Sheets (`.txt`, `.csv`, `.tsv`)
- Optional ID mapping: `data/id-map.csv` (gene ↔ protein ↔ UniProt)

`.xlsx` files are linked on GitHub but not parsed in the browser yet.
