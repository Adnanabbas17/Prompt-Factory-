import Link from 'next/link';
import { Prompt } from '@/lib/types';
import { CATEGORY_TEXT } from '@/lib/constants';
import CopyButton from './CopyButton';

interface PromptCardProps {
  prompt: Prompt;
}

export default function PromptCard({ prompt }: PromptCardProps) {
  return (
    <article className="group border-b-2 border-light-border pb-10 dark:border-dark-border">
      <div className="flex items-start justify-between gap-4">
        <Link href={`/prompts/${prompt.id}`} className="min-w-0 flex-1">
          <h3 className="mb-3 text-xl text-light-text transition-opacity group-hover:opacity-75 dark:text-dark-text">
            {prompt.title}
          </h3>
          <p className="mb-4 line-clamp-2 text-base leading-relaxed text-light-text-secondary dark:text-dark-text-secondary">
            {prompt.description}
          </p>
        </Link>

        <div className="flex-shrink-0 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100">
          <CopyButton text={prompt.content} variant="small" />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm text-light-text-secondary dark:text-dark-text-secondary">
        <span>{prompt.author}</span>
        <span aria-hidden="true">•</span>
        <span className={`font-medium ${CATEGORY_TEXT[prompt.category]}`}>{prompt.category}</span>
        <span aria-hidden="true">•</span>
        <span>{prompt.difficulty}</span>
      </div>
    </article>
  );
}
