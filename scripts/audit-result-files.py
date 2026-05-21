#!/usr/bin/env python3
"""Rebuild data/project-files.json — sheet Result Files vs tmt-projects/Projects."""
import csv, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV = os.path.join(ROOT, 'data', 'projects.csv')
PROJECTS = os.path.normpath(os.path.join(ROOT, '..', '..', 'tmt-projects', 'Projects'))
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

def main():
    if not os.path.isdir(PROJECTS):
        print('Missing', PROJECTS, file=sys.stderr)
        sys.exit(1)
    manifest = {}
    for r in csv.DictReader(open(CSV, encoding='utf-8-sig')):
        pid = (r.get('Project ID') or '').strip()
        m = re.match(r'^(IPX\d+)\s*\((PXD\d+)\)', pid, re.I)
        if m:
            pid = m.group(2)
        rf = first_rf(r.get('Result Files'))
        if not pid:
            continue
        folder = os.path.join(PROJECTS, pid)
        entry = {
            'sheet_result': rf,
            'fasta': (r.get('FASTA (Unified)') or '').strip(),
            'sheet_count': sheet_count(r.get('Proteins Quantified')),
            'files': sorted(os.listdir(folder)) if os.path.isdir(folder) else [],
        }
        manifest[pid] = entry
    with open(OUT, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, ensure_ascii=False, indent=0)
    print('Wrote', OUT, 'projects', len(manifest))

if __name__ == '__main__':
    main()
