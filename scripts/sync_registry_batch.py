# -*- coding: utf-8 -*-
"""Sync 47 registry projects: TMT site CSV, overrides, project-files, tmt-projects catalog."""
from __future__ import annotations

import csv
import importlib.util
import json
import zipfile
from pathlib import Path

TMT_CSV = Path(__file__).resolve().parents[1] / "data" / "projects.csv"
TP_CSV = Path(r"C:\Users\Sirius\Projects\tmt-projects\data\projects.csv")
OV_PATH = TMT_CSV.parent / "pdc-summary-overrides.json"
PF_PATH = TMT_CSV.parent / "project-files.json"
PACKS = Path(r"C:\Users\Sirius\Projects\tmt-projects\Projects")

spec = importlib.util.spec_from_file_location(
    "audit", Path(r"C:\Users\Sirius\Projects\tmt-projects\audit_registry_batch.py")
)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)
REGISTRY: dict[str, dict[str, str]] = mod.REGISTRY
COHORT = mod.COHORT_COLS
META = mod.META_COLS

IPX_FIX = {
    "Proteins Quantified": "8854",
    "FDR (Unified %)": "1%",
    "Result Files": "result_IPX0002532001",
    "preCancer": "0",
    "Healty trraeted": "0",
}


def read_summary_csv(path: Path) -> dict[str, str]:
    out: dict[str, str] = {}
    with path.open(encoding="utf-8-sig", newline="") as f:
        for row in csv.reader(f):
            if len(row) >= 2 and row[0].strip().lower() != "atlas summary":
                out[row[0].strip()] = ",".join(row[1:]).strip()
    return out


def summary_from_zip(pid: str) -> dict[str, str]:
    folder = PACKS / pid
    zpath = next(folder.glob("*.zip"), None)
    if not zpath:
        return {}
    with zipfile.ZipFile(zpath) as zf:
        name = next((n for n in zf.namelist() if n.endswith("_summary.csv")), None)
        if not name:
            return {}
        text = zf.read(name).decode("utf-8-sig")
    out: dict[str, str] = {}
    for row in csv.reader(text.splitlines()):
        if len(row) >= 2 and row[0].strip().lower() != "atlas summary":
            out[row[0].strip()] = ",".join(row[1:]).strip()
    return out


def summary_to_override(pid: str, s: dict[str, str]) -> dict[str, str]:
    mapping = {
        "PMID": "PMID",
        "Organ": "Organ",
        "Disease": "Disease",
        "Biospecimen_type": "Sample Type",
        "Total_biological_samples": "Total Samples",
        "preCancer": "preCancer",
        "Case_Cancer_Untreated": "Case Cancer Untreated",
        "Case_Cancer_Treated": "Case Cancer Treated",
        "Control_Healthy": "Control Healthy",
        "Healthy_treated": "Healty trraeted",
        "Total_unique_patients": "Patients / donors",
        "UniProt_proteins": "Proteins Quantified",
        "Male_patients": "Male_patients",
        "Female_patients": "Female_patients",
        "Sex_unknown": "Sex_unknown",
    }
    ov: dict[str, str] = {"source": "summary_csv", "summary_file": f"{pid}_summary.csv"}
    for sk, ck in mapping.items():
        if s.get(sk) not in (None, ""):
            ov[ck] = s[sk]
    if s.get("Protein_rows_result"):
        ov["Protein_rows_result"] = s["Protein_rows_result"]
    if s.get("Verification_notes"):
        ov["Verification_notes"] = s["Verification_notes"]
    return ov


def update_csv(path: Path) -> int:
    with path.open(encoding="utf-8-sig", newline="") as f:
        rows = list(csv.DictReader(f))
        fields = rows[0].keys() if rows else []

    n = 0
    for row in rows:
        pid = (row.get("Project ID") or "").strip()
        if pid not in REGISTRY:
            continue
        reg = REGISTRY[pid]
        for col in COHORT + META:
            if col in reg and col in row:
                if row[col] != reg[col]:
                    row[col] = reg[col]
                    n += 1
        if pid == "IPX0002532001 (PXD022714)":
            for col, val in IPX_FIX.items():
                if col in row and row[col] != val:
                    row[col] = val
                    n += 1

    with path.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields, extrasaction="ignore")
        w.writeheader()
        w.writerows(rows)
    return n


def sync_tp_from_tmt() -> int:
    with TMT_CSV.open(encoding="utf-8-sig", newline="") as f:
        tmt = {(r["Project ID"] or "").strip(): r for r in csv.DictReader(f)}
    with TP_CSV.open(encoding="utf-8-sig", newline="") as f:
        rows = list(csv.DictReader(f))
        fields = list(rows[0].keys()) if rows else []

    n = 0
    copy_cols = set(COHORT + META + [
        "Proteins Quantified", "Result Files", "Quantification_Format",
        "Normalization Strategy", "Data_Caveats", "Short Description",
        "Experimental Design", "Main_Finding", "FDR (Unified %)",
        "Platform MS (Unified)", "TMT Label (Unified)", "Modifications",
        "FASTA (Unified)", "FASTA Year", "Samples Original N", "Samples Used N",
    ])
    for row in rows:
        pid = (row.get("Project ID") or "").strip()
        if pid not in REGISTRY or pid not in tmt:
            continue
        src = tmt[pid]
        for col in copy_cols:
            if col in row and col in src and row.get(col) != src.get(col):
                row[col] = src[col]
                n += 1

    with TP_CSV.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields, extrasaction="ignore")
        w.writeheader()
        w.writerows(rows)
    return n


def update_overrides() -> None:
    data = json.loads(OV_PATH.read_text(encoding="utf-8"))
    projects: dict = data.setdefault("projects", {})

    for pid in REGISTRY:
        if not pid.startswith("PDC"):
            continue
        entry = dict(projects.get(pid, {}))
        for col in COHORT:
            if col in REGISTRY[pid]:
                entry[col] = REGISTRY[pid][col]
        entry.setdefault("source", "registry_cohort")
        projects[pid] = entry

    for pid in ("MSV000090700", "MSV000085836", "IPX0004253000", "IPX0002532001 (PXD022714)"):
        s = summary_from_zip(pid)
        if s:
            projects[pid] = summary_to_override(pid, s)
        elif pid in REGISTRY:
            projects[pid] = {k: REGISTRY[pid][k] for k in COHORT if k in REGISTRY[pid]}
            projects[pid]["source"] = "registry_cohort"
        if pid == "IPX0002532001 (PXD022714)":
            projects[pid]["Proteins Quantified"] = "8854"

    data["n_projects"] = len(projects)
    OV_PATH.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def update_project_files() -> None:
    pf = json.loads(PF_PATH.read_text(encoding="utf-8"))
    pf["IPX0002532001 (PXD022714)"] = {
        "sheet_result": "result_IPX0002532001",
        "fasta": "UniProt",
        "sheet_count": 8854,
        "files": [],
    }
    pf["PXD022714"] = {
        "sheet_result": "result_IPX0002532001",
        "fasta": "UniProt",
        "sheet_count": 8854,
        "files": [],
    }
    for pid, count in (("MSV000090700", 8071), ("MSV000085836", 12638), ("IPX0004253000", 3061)):
        pf[pid] = {
            "sheet_result": f"result_{pid}",
            "fasta": pf.get(pid, {}).get("fasta", "UniProt"),
            "sheet_count": count,
            "files": pf.get(pid, {}).get("files", []),
        }
    PF_PATH.write_text(json.dumps(pf, indent=0, ensure_ascii=False) + "\n", encoding="utf-8")


def main() -> None:
    n1 = update_csv(TMT_CSV)
    update_overrides()
    update_project_files()
    n2 = sync_tp_from_tmt()
    print(f"TMT projects.csv cells updated: {n1}")
    print(f"tmt-projects catalog cells synced from TMT: {n2}")
    print("Updated pdc-summary-overrides.json and project-files.json")


if __name__ == "__main__":
    main()
