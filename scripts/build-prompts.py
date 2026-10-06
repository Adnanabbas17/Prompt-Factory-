#!/usr/bin/env python3
"""Build public/data/prompts.json from the Curated Prompt Library .docx.

Usage:
    python3 scripts/build-prompts.py <path-to-Curated-Prompt-Library.docx>

Standard library only (zipfile + xml.etree), so nothing is added to package.json.

Prompt content is extracted as raw paragraph text from word/document.xml. There is
no markdown conversion, so literal characters such as #, **, backticks and backslashes
stay exactly as written. Paragraphs are joined with "\\n". The docx stores blank lines
as a paragraph holding a single space; those become empty lines.

Fields that cannot be derived from the docx (description, useCase, tags) are read
from scripts/prompt-metadata.json, keyed by prompt id. The script fails if any prompt
has no entry or any entry has no prompt.

Parsing rules (the structure is verified, and the script stops if it does not hold):
    Heading1  "<Category> (<count>)"   starts a category; front matter has no count
    Heading2  "<N>. <Title>"           starts a prompt
    next line "Source: <src>  |  Licence: <lic>  [|  Variables: a, b]"
    the remaining paragraphs up to the next heading are the body
Prompts listed in EXCLUDE are parsed and checked, then left out of the output.
"""

import json
import re
import sys
import unicodedata
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'

ROOT = Path(__file__).resolve().parent.parent
OUT_PATH = ROOT / 'public' / 'data' / 'prompts.json'
METADATA_PATH = Path(__file__).resolve().parent / 'prompt-metadata.json'

CREATED_AT = '2026-10-06'

# Prompts left out of the output, keyed by their number in the docx. The title guards
# against the docx being renumbered. Each entry: (title, one-line reason).
EXCLUDE = {
    37: ('Project Manager', 'Written as a reply to a PRD request, not as an instruction to the model.'),
    52: ('Financial Analyst', 'garbled wording, asks for stock market prediction'),
    60: ('Salesperson', 'Tells the model to make a product look more valuable than it is to push a sale.'),
}

# Source line value in the docx -> app fields.
SOURCES = {
    'prompts.chat (f/prompts.chat)': {
        'name': 'prompts.chat',
        'url': 'https://github.com/f/prompts.chat',
        'licence': 'CC0-1.0',
    },
    'LLM-Prompt-Library (abilzerian)': {
        'name': 'LLM-Prompt-Library (abilzerian)',
        'url': 'https://github.com/abilzerian/LLM-Prompt-Library',
        'licence': 'MIT',
    },
}

CATEGORY_RE = re.compile(r'^(.*\S)\s*\((\d+)\)$')
TITLE_RE = re.compile(r'^(\d+)\.\s+(\S.*)$')


class BuildError(Exception):
    pass


def paragraph_text(p):
    return ''.join(t.text or '' for t in p.iter(W + 't'))


def paragraph_style(p):
    ppr = p.find(W + 'pPr')
    if ppr is None:
        return None
    style = ppr.find(W + 'pStyle')
    return style.get(W + 'val') if style is not None else None


def read_paragraphs(docx_path):
    """Top-level body paragraphs as (style, text). The contents table (w:sdt) is skipped."""
    with zipfile.ZipFile(docx_path) as z:
        root = ET.fromstring(z.read('word/document.xml'))
    body = root.find(W + 'body')
    return [(paragraph_style(c), paragraph_text(c)) for c in body if c.tag == W + 'p']


def parse_source_line(line):
    if not line.startswith('Source:'):
        raise BuildError(f'expected a "Source:" line, got {line[:80]!r}')
    fields = {}
    for part in line.split('|'):
        key, sep, value = part.partition(':')
        if not sep:
            raise BuildError(f'malformed Source line: {line!r}')
        fields[key.strip()] = value.strip()
    unknown = set(fields) - {'Source', 'Licence', 'Variables'}
    if unknown or 'Source' not in fields or 'Licence' not in fields:
        raise BuildError(f'unexpected Source line fields {sorted(fields)}: {line!r}')
    variables = []
    if 'Variables' in fields:
        variables = [v.strip() for v in fields['Variables'].split(',')]
        if not variables or any(not v for v in variables):
            raise BuildError(f'empty variable name in: {line!r}')
    return fields['Source'], fields['Licence'], variables


def parse_docx(docx_path):
    paragraphs = read_paragraphs(docx_path)
    prompts = []
    category = None
    category_counts = {}
    current = None

    for style, text in paragraphs:
        if style == 'Heading1':
            m = CATEGORY_RE.match(text)
            current = None
            if m:
                category = m.group(1)
                if category in category_counts:
                    raise BuildError(f'duplicate category heading: {category}')
                category_counts[category] = int(m.group(2))
            else:
                category = None  # front matter heading
            continue
        if category is None:
            continue
        if style == 'Heading2':
            m = TITLE_RE.match(text)
            if not m:
                raise BuildError(f'prompt heading is not "N. Title": {text!r}')
            current = {
                'number': int(m.group(1)),
                'title': m.group(2),
                'category': category,
                'source_line': None,
                'lines': [],
            }
            prompts.append(current)
        elif current is not None:
            if current['source_line'] is None:
                current['source_line'] = text
            else:
                current['lines'].append(text)
        elif text.strip():
            raise BuildError(f'text between a category heading and its first prompt: {text[:80]!r}')

    for i, p in enumerate(prompts, start=1):
        if p['number'] != i:
            raise BuildError(f'prompt numbering breaks at {p["title"]!r}: expected {i}, found {p["number"]}')
        src, licence, variables = parse_source_line(p['source_line'])
        if src not in SOURCES:
            raise BuildError(f'unknown source {src!r} in {p["title"]!r}')
        if licence != SOURCES[src]['licence']:
            raise BuildError(f'licence {licence!r} does not match source {src!r} in {p["title"]!r}')
        if not p['lines']:
            raise BuildError(f'empty body: {p["title"]!r}')
        p['source'] = SOURCES[src]
        p['variables'] = variables
        # A paragraph holding only a space is how the docx stores a blank line.
        p['content'] = '\n'.join('' if t == ' ' else t for t in p['lines'])
        if p['content'] != p['content'].strip('\n'):
            raise BuildError(f'body starts or ends with a blank line: {p["title"]!r}')

    for name, declared in category_counts.items():
        actual = sum(1 for p in prompts if p['category'] == name)
        if actual != declared:
            raise BuildError(f'category {name!r}: heading says {declared}, found {actual}')
    return prompts


def slugify(title):
    ascii_title = unicodedata.normalize('NFKD', title).encode('ascii', 'ignore').decode('ascii')
    ascii_title = re.sub(r"['’]", '', ascii_title)  # "Children's" -> "childrens", not "children-s"
    return re.sub(r'[^a-z0-9]+', '-', ascii_title.lower()).strip('-')


def assign_ids(prompts):
    seen = {}
    for p in prompts:
        base = slugify(p['title'])
        if not base:
            raise BuildError(f'title has no usable characters for an id: {p["title"]!r}')
        seen[base] = seen.get(base, 0) + 1
        p['id'] = base if seen[base] == 1 else f'{base}-{seen[base]}'


def difficulty(content, variables):
    if len(content) > 2000 or len(variables) >= 3:
        return 'Advanced'
    if not variables and len(content) < 600:
        return 'Beginner'
    return 'Intermediate'


def build(docx_path):
    prompts = parse_docx(docx_path)
    for number, (title, reason) in EXCLUDE.items():
        found = [p for p in prompts if p['number'] == number]
        if len(found) != 1 or found[0]['title'] != title:
            raise BuildError(f'EXCLUDE expects prompt {number} to be {title!r}')
        print(f'excluded {number}. {title}: {reason}')
    prompts = [p for p in prompts if p['number'] not in EXCLUDE]
    assign_ids(prompts)

    metadata = json.loads(METADATA_PATH.read_text(encoding='utf-8'))
    ids = {p['id'] for p in prompts}
    missing = sorted(ids - set(metadata))
    extra = sorted(set(metadata) - ids)
    if missing or extra:
        raise BuildError(f'prompt-metadata.json out of sync. missing: {missing}. unknown ids: {extra}')

    out = []
    for p in prompts:
        meta = metadata[p['id']]
        out.append({
            'id': p['id'],
            'title': p['title'],
            'description': meta['description'],
            'category': p['category'],
            'tags': meta['tags'],
            'author': p['source']['name'],
            'source': p['source']['name'],
            'license': p['source']['licence'],
            'sourceUrl': p['source']['url'],
            'content': p['content'],
            'useCase': meta['useCase'],
            'difficulty': difficulty(p['content'], p['variables']),
            'variables': p['variables'],
            'createdAt': CREATED_AT,
        })
    return out


def main(argv):
    if len(argv) != 2:
        print(__doc__)
        return 2
    try:
        prompts = build(Path(argv[1]))
    except BuildError as e:
        print(f'build failed: {e}', file=sys.stderr)
        return 1
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUT_PATH, 'w', encoding='utf-8', newline='\n') as f:
        json.dump({'prompts': prompts}, f, ensure_ascii=False, indent=2)
        f.write('\n')
    print(f'wrote {len(prompts)} prompts to {OUT_PATH.relative_to(ROOT)}')
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv))
