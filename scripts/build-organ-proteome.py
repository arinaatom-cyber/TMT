#!/usr/bin/env python3
"""Build data/organ-proteome.json — fast precomputed UniProt index per organ."""
from __future__ import annotations

import csv
import json
import os
import re
import sys
from collections import defaultdict
from datetime import datetime, timezone

import pandas as pd

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV_PATH = os.path.join(ROOT, "data", "projects.csv")
ID_MAP_PATH = os.path.join(ROOT, "data", "id-map.csv")
PROJECTS_ROOT = os.path.normpath(os.path.join(ROOT, "..", "..", "tmt-projects", "Projects"))
OUT_PATH = os.path.join(ROOT, "data", "organ-proteome.json")
MAX_ROWS = 20000
SKIP_NAME = re.compile(r"psm|mqpar|sdrf|design|checksum|\.pdf$|\.fasta$|\.xml$|\.rar$", re.I)

UNIPROT_RE = re.compile(
    r"\b([OPQ][0-9][A-Z0-9]{3}[0-9]|[A-NR-Z][0-9](?:[A-Z][A-Z0-9]{2}[0-9]){1,2})\b",
    re.I,
)

ORGAN_ALIASES = {
    "brain": "Brain", "lung": "Lung", "heart": "Heart", "liver": "Liver", "kidney": "Kidney",
    "pancreas": "Pancreas", "stomach": "Stomach", "colon": "Colon", "breast": "Breast",
    "ovary": "Ovary", "prostate": "Prostate", "cervix": "Cervix", "thyroid": "Thyroid",
    "skin": "Skin", "muscle": "Muscle", "blood": "Blood", "bone marrow": "Bone_Marrow",
    "lymph node": "Lymph_Node", "lymph nodes": "Lymph_Node", "adrenal": "Adrenal_Gland",
    "bladder": "Bladder", "uterus": "Uterus", "testis": "Testis", "esophagus": "Esophagus",
    "small intestine": "Small_Intestine", "salivary": "Salivary_Gland", "pituitary": "Pituitary",
    "eye": "Eye", "nerve": "Nerve", "adipose": "Adipose_Tissue", "soft tissue": "Soft_Tissue",
    "spleen": "Spleen",
}


def load_id_map():
    m = {}
    if not os.path.isfile(ID_MAP_PATH):
        return m
    with open(ID_MAP_PATH, encoding="utf-8-sig") as f:
        for row in csv.DictReader(f):
            iid = (row.get("input_id") or "").strip()
            if not iid:
                continue
            entry = {
                "gene": (row.get("gene_symbol") or "").strip(),
                "uniprot": (row.get("uniprot") or "").strip().upper(),
            }
            m[iid] = entry
            m[iid.upper()] = entry
            if entry["gene"]:
                m[entry["gene"].upper()] = entry
    return m


def extract_uniprot(s: str) -> str:
    m = UNIPROT_RE.search(str(s) if s is not None else "")
    return m.group(1).upper() if m else ""


def fasta_kind(fasta: str) -> str:
    f = (fasta or "").lower()
    if "ensembl" in f:
        return "ensembl"
    if "refseq" in f:
        return "refseq"
    if "uniprot" in f:
        return "uniprot"
    return "mixed"


def sheet_count(s: str) -> int | None:
    if not s:
        return None
    m = re.search(r"(\d[\d,]*)", str(s).replace(",", ""))
    return int(m.group(1)) if m else None


def first_result_file(s: str) -> str:
    for line in (s or "").splitlines():
        x = line.strip().lstrip("•- ").strip()
        if x and len(x) < 200 and "→" not in x:
            return x
    return ""


def normalize_pid(pid: str) -> str:
    pid = (pid or "").strip()
    m = re.match(r"^(IPX\d+)\s*\((PXD\d+)\)", pid, re.I)
    return m.group(2) if m else pid


def classify_organs(raw: str) -> list[str]:
    if not raw or not str(raw).strip():
        return ["Other"]
    low = str(raw).lower()
    if "multiple organs" in low or "multi-organ" in low:
        return ["Multiple_Organs"]
    out = set()
    for p in re.split(r"[;|]", raw):
        pl = p.strip().lower()
        if not pl:
            continue
        matched = False
        for key, canon in sorted(ORGAN_ALIASES.items(), key=lambda x: -len(x[0])):
            if key in pl:
                out.add(canon)
                matched = True
                break
        if not matched:
            out.add("Other")
    return list(out) if out else ["Other"]


def pick_file(result_name: str, files: list[str]) -> str | None:
    scored = []
    for fn in files:
        if SKIP_NAME.search(fn):
            continue
        if not fn.lower().endswith((".txt", ".csv", ".tsv", ".xlsx", ".xls")):
            continue
        score = 0
        if result_name and result_name.lower() in fn.lower():
            score += 20
        if re.search(r"proteingroup|proteins_table|protein_table", fn, re.I):
            score += 15
        if fn.lower().endswith(".txt"):
            score += 5
        if fn.lower().endswith(".xlsx"):
            score += 3
        scored.append((score, fn))
    if not scored:
        return None
    scored.sort(reverse=True)
    return scored[0][1]


def find_gene_col(columns) -> str | None:
    for c in columns:
        cl = str(c).lower()
        if re.search(r"^gene.?name|^gene$|gene names|associated gene", cl):
            return c
    return None


def find_id_col(columns) -> str | None:
    for c in columns:
        cl = str(c).lower()
        if re.search(r"protein.?ids|majority protein|protein accession|^protein id$", cl):
            return c
    return None


def parse_file(path: str, fasta: str, id_map: dict) -> list[dict]:
    try:
        if path.lower().endswith((".xlsx", ".xls")):
            df = pd.read_excel(path, dtype=str, nrows=MAX_ROWS)
        elif path.lower().endswith(".csv"):
            df = pd.read_csv(path, dtype=str, nrows=MAX_ROWS, low_memory=False)
        else:
            df = pd.read_csv(path, sep="\t", dtype=str, nrows=MAX_ROWS, low_memory=False)
    except Exception as e:
        print("  skip", os.path.basename(path), e, file=sys.stderr)
        return []

    if df.empty:
        return []
    kind = fasta_kind(fasta)
    gene_col = find_gene_col(df.columns)
    id_col = find_id_col(df.columns)
    seen = set()
    out = []

    def push(u: str, g: str):
        u = (u or "").upper()
        g = (g or "").strip()
        if not u and g:
            ent = id_map.get(g) or id_map.get(g.upper())
            if ent and ent.get("uniprot"):
                u = ent["uniprot"]
        if not u and not g:
            return
        key = u or g.upper()
        if key in seen:
            return
        seen.add(key)
        out.append({"u": u, "g": g})

    if kind in ("ensembl", "refseq") and gene_col:
        for g in df[gene_col].dropna().astype(str):
            g = g.split(";")[0].strip()
            if g and len(g) < 20:
                push("", g)
        return out

    if id_col:
        for blob in df[id_col].dropna().astype(str):
            for part in re.split(r"[;|]", blob):
                part = part.strip()
                if not part:
                    continue
                u = extract_uniprot(part)
                g = ""
                if gene_col:
                    # gene col is per-row not per-part — handled below
                    pass
                push(u, g if not u else "")
    if gene_col:
        for g in df[gene_col].dropna().astype(str):
            for part in re.split(r"[;|]", g):
                part = part.strip()
                if part and len(part) < 20:
                    push(extract_uniprot(part), part if not extract_uniprot(part) else "")

    return out


def main():
    if not os.path.isdir(PROJECTS_ROOT):
        print("Missing", PROJECTS_ROOT, file=sys.stderr)
        sys.exit(1)

    id_map = load_id_map()
    organ_slot = defaultdict(dict)
    organ_stats = defaultdict(lambda: {"projects": set(), "sheet_sum": 0})
    projects_out = {}
    parsed = 0

    with open(CSV_PATH, encoding="utf-8-sig") as f:
        rows = list(csv.DictReader(f))

    for i, r in enumerate(rows):
        pid = normalize_pid(r.get("Project ID", ""))
        if not pid:
            continue
        organs = classify_organs(r.get("Organ") or "")
        fasta = (r.get("FASTA (Unified)") or "").strip()
        sc = sheet_count(r.get("Proteins Quantified", ""))
        rf = first_result_file(r.get("Result Files", ""))
        folder = os.path.join(PROJECTS_ROOT, pid)
        proteins = []
        src = ""
        if os.path.isdir(folder):
            fn = pick_file(rf, os.listdir(folder))
            if fn:
                fp = os.path.join(folder, fn)
                proteins = parse_file(fp, fasta, id_map)
                if proteins:
                    src = fn
                    parsed += 1
        projects_out[pid] = {
            "organs": organs,
            "sheet": sc,
            "file_n": len(proteins),
            "fasta": fasta,
            "result": rf,
            "src": src,
        }
        for organ in organs:
            organ_stats[organ]["projects"].add(pid)
            if sc:
                organ_stats[organ]["sheet_sum"] += sc
            for p in proteins:
                key = p["u"] or p["g"].upper()
                slot = organ_slot[organ].setdefault(key, {"u": p["u"], "g": p["g"], "projects": set()})
                slot["projects"].add(pid)
                if p["g"] and not slot["g"]:
                    slot["g"] = p["g"]
        if (i + 1) % 20 == 0:
            print(f"  {i+1}/{len(rows)} … parsed {parsed}", file=sys.stderr)

    organs_out = {}
    for organ, proteins in organ_slot.items():
        st = organ_stats[organ]
        items = [
            {"u": s["u"], "g": s["g"], "p": sorted(s["projects"])}
            for s in proteins.values()
        ]
        items.sort(key=lambda x: (-len(x["p"]), x["u"] or x["g"]))
        organs_out[organ] = {
            "projects": len(st["projects"]),
            "sheet_sum": st["sheet_sum"],
            "unique": len(items),
            "with_uniprot": sum(1 for x in items if x["u"]),
            "gene_only": sum(1 for x in items if not x["u"] and x["g"]),
            "proteins": items,
        }

    payload = {
        "v": 1,
        "built": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "parsed_projects": parsed,
        "organs": organs_out,
        "projects": projects_out,
    }
    with open(OUT_PATH, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, separators=(",", ":"))

    print(f"Wrote {OUT_PATH} ({os.path.getsize(OUT_PATH)/1e6:.2f} MB), parsed {parsed}/{len(projects_out)} projects")
    top = sorted(organs_out.items(), key=lambda x: -x[1]["unique"])[:6]
    for organ, o in top:
        print(f"  {organ}: {o['unique']} ids ({o['with_uniprot']} UniProt)")


if __name__ == "__main__":
    main()
