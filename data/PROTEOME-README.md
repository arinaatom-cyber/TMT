# organ-proteome.json

Precomputed protein index for the web atlas (no Excel parsing in the browser).

## Rebuild after updating `tmt-projects/Projects/`

```powershell
cd human-proteome-atlas
python scripts/build-organ-proteome.py
```

Requires: `pandas`, `openpyxl`, local clone `../tmt-projects/Projects/`.

## Format

- **organs** — per organ: unique proteins `{ u: UniProt, g: gene, p: [project IDs] }`
- **projects** — per PXD: sheet count, parsed file count, FASTA, Result Files name

## Sheet vs index

| Source | Meaning |
|--------|---------|
| `Proteins Quantified` (Google Sheet) | Author-reported count — shown on project cards |
| `organ-proteome.json` | Parsed IDs from result files — lists & organ compare |

Gene-only rows (Ensembl) can be mapped to UniProt via `data/id-map.csv`.
