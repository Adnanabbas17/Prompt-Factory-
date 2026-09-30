import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CopyButton from '@/components/CopyButton';
import PromptCard from '@/components/PromptCard';
import { CATEGORY_TEXT } from '@/lib/constants';
import { getPromptById, getRelatedPrompts, prompts } from '@/lib/prompts';

interface PromptPageProps {
  params: { id: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return prompts.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: PromptPageProps): Metadata {
  const prompt = getPromptById(params.id);
  if (!prompt) return { title: 'Prompt not found | Prompt Factory' };
  return { title: `${prompt.title} | Prompt Factory`, description: prompt.description };
}

const labelClass =
  'mb-3 font-serif text-xs uppercase tracking-wide text-light-text-secondary dark:text-dark-text-secondary';

export default function PromptPage({ params }: PromptPageProps) {
  const prompt = getPromptById(params.id);
  if (!prompt) notFound();

  const related = getRelatedPrompts(prompt);
  const createdAt = new Date(prompt.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <div className="mx-auto max-w-4xl px-6 py-24 md:px-10">
      <Link
        href="/"
        className="mb-12 inline-block text-sm text-light-link hover:underline dark:text-dark-accent"
      >
        ← Back
      </Link>

      <h1 className="mb-8 text-5xl font-light text-light-text dark:text-dark-text md:text-6xl">{prompt.title}</h1>

      <div className="mb-16 flex flex-wrap items-center gap-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">
        <span>{prompt.author}</span>
        <span aria-hidden="true">•</span>
        <span className={`font-medium ${CATEGORY_TEXT[prompt.category]}`}>{prompt.category}</span>
        <span aria-hidden="true">•</span>
        <span>{prompt.difficulty}</span>
        <span aria-hidden="true">•</span>
        <time dateTime={prompt.createdAt}>{createdAt}</time>
      </div>

      <div className="mb-16 border-2 border-light-border bg-light-surface p-6 shadow-sm dark:border-dark-border dark:bg-dark-surface md:p-10">
        <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-relaxed text-light-text dark:text-dark-text">
          {prompt.content}
        </pre>
      </div>

      <div className="mb-16 flex justify-center">
        <CopyButton text={prompt.content} variant="large" />
      </div>

      <div className="mb-16 grid grid-cols-1 gap-12 border-b-2 border-light-border pb-16 dark:border-dark-border sm:grid-cols-2">
        <div>
          <h2 className={labelClass}>Use Case</h2>
          <p className="text-base leading-relaxed text-light-text dark:text-dark-text">{prompt.useCase}</p>
        </div>
        <div>
          <h2 className={labelClass}>Tags</h2>
          <ul className="flex flex-wrap gap-3">
            {prompt.tags.map((tag) => (
              <li
                key={tag}
                className="border border-light-border bg-light-surface px-4 py-2 text-xs text-light-text dark:border-dark-border dark:bg-dark-surface dark:text-dark-text"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-20 grid grid-cols-1 gap-12 sm:grid-cols-2">
        <div>
          <p className={labelClass}>Rating</p>
          <p className="font-serif text-4xl font-light text-light-text dark:text-dark-text">
            {prompt.rating.toFixed(1)}
            <span className="text-lg text-light-text-secondary dark:text-dark-text-secondary"> / 5</span>
          </p>
        </div>
        <div>
          <p className={labelClass}>Usage Count</p>
          <p className="font-serif text-4xl font-light text-light-text dark:text-dark-text">
            {prompt.usageCount.toLocaleString('en-US')}
            <span className="text-lg text-light-text-secondary dark:text-dark-text-secondary"> uses</span>
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t-2 border-light-border pt-16 dark:border-dark-border">
          <h2 className="mb-12 text-3xl font-light text-light-text dark:text-dark-text">Related Prompts</h2>
          <div className="space-y-12">
            {related.map((p) => (
              <PromptCard key={p.id} prompt={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
