# Human Proteome Atlas — Interactive TMT Tissue Map

An interactive, organ-level map of **human TMT (Tandem Mass Tag) multiplex proteomics
projects**, curated from public repositories and rendered on an anatomically scaled
body. Each project is fully traceable: click any project to open a **dossier** that
shows *why it was included*, the *selection criteria*, the *study design*, the *cohort
that was collected*, the *main finding of the source article*, the *methods*, *data
caveats*, and *all source links* (database, PubMed, result files, spreadsheet row).

**Live site:** https://arinaatom-cyber.github.io/TMT/

---

## What this is

Quantitative proteomics increasingly relies on **isobaric TMT multiplexing** (TMT‑6/10/11
and TMTpro‑16/18) for deep, comparative profiling of tissues and cohorts. Datasets are
scattered across PRIDE, CPTAC/PDC, iProX and MassIVE with heterogeneous, free‑text
metadata, which makes it hard to answer simple questions such as *"which human TMT
proteomics cohorts exist for the kidney, and how large were they?"*

This atlas consolidates such projects into a single, queryable, reproducible resource:

- An **anatomically scaled SVG body** (drawn to a documented ~4.1 px/cm reference) where
  every organ is clickable and labeled.
- A **per‑organ catalogue** of projects with cancer/normal split, disease groups,
  sample types, patient/sample counts and quantified‑protein counts.
- A **per‑project dossier** that exposes the full provenance chain from raw repository
  metadata to the curated row used here.
- A **literature & sources** section and an **About** panel documenting the anatomical
  references and organ‑system classification (MSD/Merck Manual).

> ⚠️ **Scope & disclaimer.** This is a research/curation aid, not a clinical resource.
> Anatomical reference sizes are *central atlas values*, not diagnostic norms.

---

## Data at a glance

| Metric | Value |
|---|---|
| Catalogue rows (projects) | 123 |
| Unique source accessions | 121 (a few are split into sub‑cohorts — see `METHODS.md`) |
| Organs represented | 31 |
| Patients / donors (Σ, where reported) | ~5,950 |
| Total samples (Σ, approximate) | ~16,000 |
| Source repositories | PRIDE · CPTAC / PDC · iProX · MassIVE |

Numbers are computed live from `data/projects.csv`; see **Reproducibility** below.

---

## How a reader uses it (5 → 10 seconds)

1. **Land on the map** — the headline states what the atlas is and the totals.
2. **Pick an organ** (click on the body or the system list on the left).
3. The right panel shows the organ’s **projects, cancer/normal split, disease groups,
   sample types, and Σ patients / Σ samples**.
4. **Click a project ID (or “Dossier”)** to open the full provenance card:
   - **Why it is in the atlas / selection criteria**
   - **Study design**
   - **What was collected (cohort)**
   - **Main finding of the article**
   - **Methods** (MS platform, TMT label, FDR, FASTA, modifications, normalization)
   - **Data caveats**
   - **Sources** — database page, PubMed article, result files, spreadsheet row.

---

## Repository layout

```
.
├── index.html                 # App shell, styles, modals
├── app.js                     # Data load, organ classification, rendering, dossier
├── proteins.js                # Protein-index badges / per-project protein view
├── data/
│   ├── projects.csv           # Master catalogue (one row per project / sub-cohort)
│   ├── organ-proteome.json    # Protein index built from result files
│   ├── project-stats.json     # Recomputed per-project statistics
│   └── project-cache/         # Cached repository metadata per accession
├── scripts/                   # Python/PowerShell build & QC utilities
├── discovery/                 # Static discovery sub-site (new-project monitoring)
├── METHODS.md                 # Inclusion criteria, sources, classification, QC
├── DATA_DICTIONARY.md         # Every column in projects.csv, defined
└── LICENSE
```

---

## Reproducibility

The site reads `data/projects.csv` directly (no build step required to view it).
Per‑organ counts are **unique project IDs per organ**; the app verifies this invariant
at load time. To re‑derive headline numbers locally:

```bash
python - <<'PY'
import csv, re
rows=[r for r in csv.DictReader(open('data/projects.csv',encoding='utf-8'))
      if r['Project ID'].strip()]
def pid(p):
    m=re.match(r'^(IPX\d+)\s*\((PXD\d+)\)',p,re.I); return m.group(2) if m else p.strip()
print('rows:',len(rows))
print('unique accessions:',len({pid(r['Project ID']) for r in rows}))
def num(x):
    try: return float(str(x).replace(',','')) 
    except: return 0
print('Σ patients:',int(sum(num(r['Patients / donors']) for r in rows)))
PY
```

Build/QC helpers live in `scripts/` (protein indexing, result‑file auditing, statistic
recomputation). See `data/PROTEOME-README.md` for the protein‑index pipeline.

---

## Local development

```bash
python -m http.server 8080
# then open http://localhost:8080
```

The UI defaults to **English** with a one‑click **EN/RU** toggle. Charts and all
on‑screen text use a single typeface (Inter) for visual consistency.

---

## Deployment (GitHub Pages)

1. Push to `main`.
2. **Settings → Pages → Build and deployment → Source: Deploy from a branch.**
3. Branch `main`, folder `/ (root)`.
4. Site serves at `https://<user>.github.io/TMT/`.

A data‑sync workflow is provided in `.github/workflows/`.

---

## Data sources & methodology

Project selection, organ classification, the keyword/substring matching logic and the
quality‑control checks are documented in **[`METHODS.md`](METHODS.md)**. Every column in
the catalogue is defined in **[`DATA_DICTIONARY.md`](DATA_DICTIONARY.md)**. Anatomical
references and the organ‑system classification (MSD/Merck Manual) are listed in the
site’s *Literature & sources* section and *About* panel.

---

## Citation

> Human Proteome Atlas — Interactive TMT Tissue Map. https://arinaatom-cyber.github.io/TMT/

## License

Code is released under the MIT License (see [`LICENSE`](LICENSE)). Curated metadata in
`data/projects.csv` aggregates publicly available repository records; the underlying
datasets remain under the licenses of their original repositories (PRIDE, CPTAC/PDC,
iProX, MassIVE) and publications.
