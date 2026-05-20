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

## Adding a project

1. Create `projects/<PROJECT_ID>/`
2. Drop the result files into the folder
3. Push to `main`
4. The atlas link will start working immediately
