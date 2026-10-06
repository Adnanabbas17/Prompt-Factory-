import type { Metadata } from 'next';
import Link from 'next/link';
import { prompts } from '@/lib/prompts';

export const metadata: Metadata = {
  title: 'Licenses | Prompt Factory',
  description: 'Sources and licenses for the prompts in Prompt Factory.',
};

const MIT_NOTICE = 'Copyright (c) 2025 Alexander Bilzerian';

const MIT_TEXT = [
  'MIT License',
  MIT_NOTICE,
  'Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:',
  'The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.',
  'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.',
];

// Inline links are always underlined so they do not rely on color alone (WCAG 1.4.1).
const linkClass = 'text-light-link underline underline-offset-2 hover:no-underline dark:text-dark-accent';
const bodyClass = 'text-base leading-relaxed text-light-text dark:text-dark-text';
const h2Class = 'mb-4 text-3xl font-light text-light-text dark:text-dark-text';

const countBySource = (source: string) => prompts.filter((p) => p.source === source).length;

export default function LicensesPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24 md:px-10">
      <Link href="/" className="mb-12 inline-block text-sm text-light-link hover:underline dark:text-dark-accent">
        ← Back
      </Link>

      <h1 className="mb-8 text-5xl font-light text-light-text dark:text-dark-text md:text-6xl">Licenses</h1>
      <p className={`${bodyClass} mb-16 max-w-2xl`}>
        The prompts in Prompt Factory come from two open-licensed GitHub repositories. Prompts are reproduced
        unmodified from their sources, including original typos.
      </p>

      <section className="mb-16 border-t-2 border-light-border pt-12 dark:border-dark-border">
        <h2 className={h2Class}>prompts.chat</h2>
        <p className={`${bodyClass} mb-4`}>
          {countBySource('prompts.chat')} prompts. Source repository:{' '}
          <a href="https://github.com/f/prompts.chat" target="_blank" rel="noopener noreferrer" className={linkClass}>
            github.com/f/prompts.chat
          </a>
          .
        </p>
        <p className={bodyClass}>
          prompts.chat prompts are{' '}
          <a
            href="https://creativecommons.org/publicdomain/zero/1.0/"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            CC0 1.0
          </a>{' '}
          (public domain, no attribution required).
        </p>
      </section>

      <section className="mb-16 border-t-2 border-light-border pt-12 dark:border-dark-border">
        <h2 className={h2Class}>LLM-Prompt-Library (abilzerian)</h2>
        <p className={`${bodyClass} mb-4`}>
          {countBySource('LLM-Prompt-Library (abilzerian)')} prompts. Source repository:{' '}
          <a
            href="https://github.com/abilzerian/LLM-Prompt-Library"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            github.com/abilzerian/LLM-Prompt-Library
          </a>
          .
        </p>
        <p className={`${bodyClass} mb-8`}>
          LLM-Prompt-Library prompts are MIT licensed and are reproduced unmodified. The copyright and permission
          notice below applies to them.
        </p>

        <div className="space-y-4 border-2 border-light-border bg-light-surface p-6 text-sm leading-relaxed text-light-text shadow-sm dark:border-dark-border dark:bg-dark-surface dark:text-dark-text md:p-10">
          {MIT_TEXT.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
