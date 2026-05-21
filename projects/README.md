# Per-project result files

Each subfolder is named after a project ID (e.g. `PXD012345`, `IPX0001234`) and contains
the result tables / processed data for that project.

The Human Proteome Atlas web app links to these folders automatically using the project
ID from the master spreadsheet.

## Folder layout

```
projects/
  PXD012345/
    proteins.tsv
    peptides.tsv
    metadata.json
    ...
  PXD067890/
    ...
```

## How the link is built

In `app.js`:

```js
const GH_REPO = 'https://github.com/arinaatom-cyber/TMT';
const GH_RESULTS_PATH = 'projects';
// → https://github.com/arinaatom-cyber/TMT/tree/main/projects/<PID>
```

If no folder exists for a given project, GitHub returns 404 — middle-click on the
"GH · Results" button to fall back to a code-search across the whole repo.

## Protein lists in the web atlas

1. Column **Result Files** in the sheet → primary filename to fetch from GitHub.
2. The app also tries `protein_table.csv`, `proteins.csv`, `proteins.tsv`.
3. Optional mapping: `data/id-map.csv` (gene ↔ protein name ↔ UniProt) without editing the master sheet.

## Adding a project

1. Create `projects/<PROJECT_ID>/`
2. Add `protein_table.csv` (or the exact **Result Files** name from the sheet)
3. Push to `main`
4. On the site: open an organ → **Show proteins** / **Compare proteins**
