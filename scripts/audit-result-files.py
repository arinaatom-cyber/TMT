#!/usr/bin/env python3
"""Rebuild data/project-files.json — sheet Result Files vs tmt-projects/Projects."""
import csv, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV = os.path.join(ROOT, 'data', 'projects.csv')
PROJECTS = os.path.normpath(os.path.join(ROOT, '..', 'tmt-projects', 'Projects'))
OUT = os.path.join(ROOT, 'data', 'project-files.json')

def first_rf(s):
    for line in (s or '').split('\n'):
        x = line.strip().lstrip('•- ').strip()
        if x and len(x) < 200 and '→' not in x:
            return x
    return ''

def sheet_count(s):
    if not s:
        return None
    m = re.search(r'(\d[\d,]*)', str(s).replace(',', ''))
    return int(m.group(1)) if m else None

def resolve_folder(projects_root, pid):
    pid = (pid or '').strip()
    if not pid:
        return None, pid
    key = pid
    direct = os.path.join(projects_root, pid)
    if os.path.isdir(direct):
        return direct, key
    m = re.match(r'^(IPX\d+)\s*\((PXD\d+)\)', pid, re.I)
    if m:
        for cand in (f'{m.group(1)} ({m.group(2)})', m.group(1), m.group(2)):
            p = os.path.join(projects_root, cand)
            if os.path.isdir(p):
                return p, cand
    if re.match(r'^PXD029216_', pid, re.I):
        p = os.path.join(projects_root, pid)
        if os.path.isdir(p):
            return p, pid
    return None, key

def main():
    if not os.path.isdir(PROJECTS):
        print('Missing', PROJECTS, file=sys.stderr)
        sys.exit(1)
    manifest = {}
    for r in csv.DictReader(open(CSV, encoding='utf-8-sig')):
        pid = (r.get('Project ID') or '').strip()
        rf = first_rf(r.get('Result Files'))
        if not pid:
            continue
        folder, key = resolve_folder(PROJECTS, pid)
        if not folder:
            key = pid.split()[0]
        entry = {
            'sheet_result': rf,
            'fasta': (r.get('FASTA (Unified)') or '').strip(),
            'sheet_count': sheet_count(r.get('Proteins Quantified')),
            'files': sorted(os.listdir(folder)) if folder else [],
        }
        manifest[key] = entry
    with open(OUT, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, ensure_ascii=False, indent=0)
    print('Wrote', OUT, 'projects', len(manifest))

if __name__ == '__main__':
    main()
