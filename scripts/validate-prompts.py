#!/usr/bin/env python3
"""Validate public/data/prompts.json against the Curated Prompt Library .docx.

Usage:
    python3 scripts/validate-prompts.py <path-to-Curated-Prompt-Library.docx>

Standard library only. The docx is read independently of build-prompts.py, so this
is a cross-check and not a replay of the build logic. Exit code 1 if any check fails.
Counts that differ from the expected numbers are reported and fail the run; nothing is
adjusted to make them match.
"""

import datetime
import json
import re
import sys
import zipfile
from collections import Counter
from pathlib import Path
from xml.etree import ElementTree as ET

W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
ROOT = Path(__file__).resolve().parent.parent
JSON_PATH = ROOT / 'public' / 'data' / 'prompts.json'
CONSTANTS_PATH = ROOT / 'lib' / 'constants.ts'

DOCX_TOTAL = 157  # numbered prompt headings in the docx
EXCLUDED = {37: 'Project Manager', 60: 'Salesperson'}  # must match EXCLUDE in build-prompts.py
EXPECTED_TOTAL = DOCX_TOTAL - len(EXCLUDED)
EXPECTED_WITH_VARIABLES = 64  # neither excluded prompt has variables
EXPECTED_CATEGORIES = {
    'Writing & Editing': 17,
    'Career & Job Search': 16,
    'Business, Strategy & Product': 21,
    'Marketing, Sales & Support': 13,
    'Productivity & Meetings': 7,
    'Coding & Software Engineering': 29,
    'Data, Research & Analysis': 10,
    'Learning & Teaching': 13,
    'Prompt Engineering (Meta-Prompts)': 12,
    'Personal & Lifestyle': 8,
    'Creative Writing': 9,
}
EXPECTED_SOURCES = {'prompts.chat': 137, 'LLM-Prompt-Library (abilzerian)': 18}
SOURCE_RULES = {
    'prompts.chat': ('CC0-1.0', 'https://github.com/f/prompts.chat'),
    'LLM-Prompt-Library (abilzerian)': ('MIT', 'https://github.com/abilzerian/LLM-Prompt-Library'),
}
DIFFICULTIES = {'Beginner', 'Intermediate', 'Advanced'}
EXPECTED_KEYS = {
    'id', 'title', 'description', 'category', 'tags', 'author', 'source', 'license',
    'sourceUrl', 'content', 'useCase', 'difficulty', 'variables', 'createdAt',
}
REQUIRED_STRINGS = [
    'id', 'title', 'description', 'category', 'author', 'source', 'license',
    'sourceUrl', 'content', 'useCase', 'difficulty', 'createdAt',
]
HYPE_WORDS = re.compile(
    r'\b(powerful|amazing|ultimate|perfect|world-class|high-quality|seamless|robust|cutting-edge|'
    r'revolutionary|stunning|ideal|elite|best|awesome|incredible|premium|state-of-the-art|'
    r'game-changing|supercharge|unlock|comprehensive|effective|engaging|optimal|expert)\b',
    re.IGNORECASE,
)
KEBAB = re.compile(r'^[a-z0-9]+(-[a-z0-9]+)*$')


def norm(s):
    return re.sub(r'\s+', ' ', s).strip()


def read_docx(path):
    """Every paragraph in document order (including the contents table) as (style, text)."""
    with zipfile.ZipFile(path) as z:
        root = ET.fromstring(z.read('word/document.xml'))
    out = []
    for p in root.iter(W + 'p'):
        ppr = p.find(W + 'pPr')
        style = None
        if ppr is not None:
            s = ppr.find(W + 'pStyle')
            style = s.get(W + 'val') if s is not None else None
        out.append((style, ''.join(t.text or '' for t in p.iter(W + 't'))))
    return out


class Report:
    def __init__(self):
        self.failures = []

    def check(self, ok, label, detail=''):
        print(f'  {"PASS" if ok else "FAIL"}  {label}' + (f'  [{detail}]' if detail and not ok else ''))
        if not ok:
            self.failures.append(label + (f': {detail}' if detail else ''))


def main(argv):
    if len(argv) != 2:
        print(__doc__)
        return 2
    paragraphs = read_docx(argv[1])
    data = json.loads(JSON_PATH.read_text(encoding='utf-8'))
    prompts = data['prompts']
    r = Report()

    # Independent view of the docx: raw text, ordered titles, variables per prompt.
    raw_text = '\n'.join(t for _, t in paragraphs)
    raw_norm = norm(raw_text)
    raw_lines = '\n' + '\n'.join('' if t == ' ' else t for _, t in paragraphs) + '\n'
    docx_all = []  # (number, title, source line) for every numbered heading
    for i, (style, text) in enumerate(paragraphs):
        m = re.match(r'^(\d+)\. (.*)$', text)
        if style == 'Heading2' and m:
            docx_all.append((int(m.group(1)), m.group(2), paragraphs[i + 1][1]))
    docx_by_number = {n: t for n, t, _ in docx_all}
    docx_titles = [t for n, t, _ in docx_all if n not in EXCLUDED]
    docx_sources = [src for n, _, src in docx_all if n not in EXCLUDED]
    docx_variables = []
    for line in docx_sources:
        m = re.search(r'\|\s*Variables:\s*(.*)$', line)
        docx_variables.append([v.strip() for v in m.group(1).split(',')] if m else [])

    print('Counts')
    r.check(len(prompts) == EXPECTED_TOTAL, f'total is {EXPECTED_TOTAL}', f'found {len(prompts)}')
    r.check(len(docx_all) == DOCX_TOTAL, f'docx has {DOCX_TOTAL} numbered prompt headings', f'found {len(docx_all)}')
    r.check(all(docx_by_number.get(n) == t for n, t in EXCLUDED.items()), 'excluded prompts are the expected docx entries', str(EXCLUDED))
    r.check(not any(p['title'] in EXCLUDED.values() for p in prompts), 'excluded prompts are absent from the JSON')
    cat_counts = Counter(p['category'] for p in prompts)
    for name, expected in EXPECTED_CATEGORIES.items():
        r.check(cat_counts.get(name, 0) == expected, f'category {name}: {expected}', f'found {cat_counts.get(name, 0)}')
    r.check(set(cat_counts) == set(EXPECTED_CATEGORIES), 'no unexpected categories', str(set(cat_counts) - set(EXPECTED_CATEGORIES)))
    src_counts = Counter(p['source'] for p in prompts)
    for name, expected in EXPECTED_SOURCES.items():
        r.check(src_counts.get(name, 0) == expected, f'source {name}: {expected}', f'found {src_counts.get(name, 0)}')
    with_vars = sum(1 for p in prompts if p['variables'])
    r.check(with_vars == EXPECTED_WITH_VARIABLES, f'{EXPECTED_WITH_VARIABLES} prompts have variables', f'found {with_vars}')

    print('Fields')
    ids = [p['id'] for p in prompts]
    r.check(len(set(ids)) == len(ids), 'ids are unique', str([i for i, c in Counter(ids).items() if c > 1]))
    r.check(all(KEBAB.match(i) for i in ids), 'ids are kebab-case', str([i for i in ids if not KEBAB.match(i)]))
    r.check(all(set(p) == EXPECTED_KEYS for p in prompts), 'every prompt has exactly the expected keys')
    r.check(not any('rating' in p or 'usageCount' in p for p in prompts), 'no rating or usageCount values')
    empty = [(p['id'], k) for p in prompts for k in REQUIRED_STRINGS if not isinstance(p.get(k), str) or not p[k].strip()]
    r.check(not empty, 'required string fields are non-empty', str(empty[:5]))
    r.check(all(isinstance(p['variables'], list) and all(isinstance(v, str) and v.strip() for v in p['variables']) for p in prompts), 'variables are arrays of non-empty strings')
    r.check(all(p['category'] in EXPECTED_CATEGORIES for p in prompts), 'category values are valid')
    r.check(all(p['difficulty'] in DIFFICULTIES for p in prompts), 'difficulty values are valid')
    r.check(all(p['title'] == t for p, t in zip(prompts, docx_titles)), 'titles and order match the docx')
    bad_src = [p['id'] for p in prompts if p['source'] not in SOURCE_RULES or p['author'] != p['source']
               or (p['license'], p['sourceUrl']) != SOURCE_RULES[p['source']]]
    r.check(not bad_src, 'author, source, license and sourceUrl are consistent', str(bad_src[:5]))
    try:
        dates_ok = all(datetime.date.fromisoformat(p['createdAt']) == datetime.date(2026, 10, 6) for p in prompts)
    except ValueError:
        dates_ok = False
    r.check(dates_ok, 'createdAt is 2026-10-06')
    r.check(all(p['variables'] == v for p, v in zip(prompts, docx_variables)), 'variables match the Source lines in the docx')

    print('Authored metadata')
    r.check(all(len(p['description']) <= 140 for p in prompts), 'description <= 140 chars', str([p['id'] for p in prompts if len(p['description']) > 140]))
    r.check(all(len(p['useCase']) <= 80 for p in prompts), 'useCase <= 80 chars', str([p['id'] for p in prompts if len(p['useCase']) > 80]))
    r.check(all(2 <= len(p['tags']) <= 4 and len(set(p['tags'])) == len(p['tags']) and all(KEBAB.match(t) for t in p['tags']) for p in prompts),
            'tags: 2 to 4 unique lowercase kebab-case', str([p['id'] for p in prompts if not (2 <= len(p['tags']) <= 4 and all(KEBAB.match(t) for t in p['tags']))]))
    hype = [(p['id'], m.group(0)) for p in prompts for m in [HYPE_WORDS.search(p['description'] + ' ' + p['useCase'])] if m]
    r.check(not hype, 'no hype words in description or useCase', str(hype[:5]))
    dashes = [p['id'] for p in prompts if re.search('[–—]', p['description'] + p['useCase'] + ''.join(p['tags']))]
    r.check(not dashes, 'no em or en dashes in authored text', str(dashes[:5]))

    print('Difficulty rule')

    def expected_difficulty(p):
        n = len(p['variables'])
        if len(p['content']) > 2000 or n >= 3:
            return 'Advanced'
        if n == 0 and len(p['content']) < 600:
            return 'Beginner'
        return 'Intermediate'

    wrong = [p['id'] for p in prompts if p['difficulty'] != expected_difficulty(p)]
    r.check(not wrong, 'difficulty matches the rule', str(wrong[:5]))

    print('Content fidelity')
    missing = [p['id'] for p in prompts if norm(p['content']) not in raw_norm]
    r.check(not missing, 'content (whitespace-normalized) appears in docx raw text', str(missing[:5]))
    inexact = [p['id'] for p in prompts if '\n' + p['content'] + '\n' not in raw_lines]
    r.check(not inexact, 'content appears line for line in the docx (blank line = single-space paragraph)', str(inexact[:5]))
    body_blank = {t for _, t in paragraphs if t != '' and t.strip() == ''}
    r.check(body_blank == {' '}, 'the only whitespace-only paragraphs are single spaces', repr(body_blank))
    r.check(all('\r' not in p['content'] for p in prompts), 'no carriage returns in content')
    artifacts = sorted({m.group(0) for p in prompts for m in re.finditer(r'\\.', p['content']) if m.group(0) not in raw_text})
    r.check(not artifacts, 'every backslash sequence in content exists in the docx raw text', str(artifacts))
    n_content, n_raw = sum(p['content'].count('\\') for p in prompts), raw_text.count('\\')
    r.check(n_content == n_raw, 'backslash count matches docx raw text', f'content {n_content}, docx {n_raw}')

    print('UI category constant')
    if CONSTANTS_PATH.exists():
        ui_names = re.findall(r"name:\s*'([^']+)'", CONSTANTS_PATH.read_text(encoding='utf-8'))
        r.check(ui_names == list(EXPECTED_CATEGORIES), 'lib/constants.ts lists the 11 categories in docx order', str(ui_names))
    else:
        r.check(False, 'lib/constants.ts exists')

    print('Difficulty distribution')
    dist = Counter(p['difficulty'] for p in prompts)
    for level in ('Beginner', 'Intermediate', 'Advanced'):
        pct = 100 * dist.get(level, 0) / len(prompts)
        print(f'  {level:<13}{dist.get(level, 0):>4}  {pct:5.1f}%')
    heavy = [lvl for lvl, c in dist.items() if 100 * c / len(prompts) > 70]
    if heavy:
        print(f'  REPORT: {", ".join(heavy)} exceeds 70% of prompts. The rule was not tuned.')

    print()
    if r.failures:
        print(f'{len(r.failures)} check(s) FAILED:')
        for f in r.failures:
            print(f'  - {f}')
        return 1
    print('All checks passed.')
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv))
