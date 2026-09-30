'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CopyButton from '@/components/CopyButton';
import PromptCard from '@/components/PromptCard';
import { Prompt } from '@/lib/types';
import { loadPrompts, getPromptById, getRelatedPrompts } from '@/lib/prompts';

interface PromptPageProps {
  params: {
    id: string;
  };
}

const categoryColors: Record<string, string> = {
  Writing: '#C9A87A',
  Coding: '#8FA87A',
  Analysis: '#C4956F',
  Brainstorm: '#B8899F',
  Teaching: '#7FA8A3',
};

export default function PromptPage({ params }: PromptPageProps) {
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [relatedPrompts, setRelatedPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const allPrompts = await loadPrompts();
      const foundPrompt = getPromptById(params.id, allPrompts);

      if (!foundPrompt) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setPrompt(foundPrompt);
      const related = getRelatedPrompts(foundPrompt, allPrompts);
      setRelatedPrompts(related);
      setLoading(false);
    };

    loadData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-24">
          <div className="space-y-12">
            <div className="h-12 bg-light-surface dark:bg-dark-surface rounded-none w-3/4 animate-pulse" />
            <div className="h-6 bg-light-surface dark:bg-dark-surface rounded-none w-full animate-pulse" />
            <div className="h-40 bg-light-surface dark:bg-dark-surface rounded-none w-full animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !prompt) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-24">
          <Link href="/" className="text-sm text-light-accent dark:text-dark-accent hover:underline mb-12 inline-block">
            ← Back
          </Link>
          <div className="text-center py-20">
            <h2 className="text-3xl font-serif text-light-text dark:text-dark-text mb-4">
              Prompt not found
            </h2>
            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-8 leading-relaxed">
              The prompt you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/" className="text-light-accent dark:text-dark-accent hover:underline">
              Back to all prompts
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-24">
        {/* Back Link */}
        <Link href="/" className="text-sm text-light-accent dark:text-dark-accent hover:underline mb-12 inline-block">
          ← Back
        </Link>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-serif font-light text-light-text dark:text-dark-text mb-8 tracking-wide">
          {prompt.title}
        </h1>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-light-text-secondary dark:text-dark-text-secondary mb-16">
          <span>{prompt.author}</span>
          <span>•</span>
          <span
            className="font-medium"
            style={{
              color: categoryColors[prompt.category],
            }}
          >
            {prompt.category}
          </span>
          <span>•</span>
          <span>{prompt.difficulty}</span>
          <span>•</span>
          <span>{new Date(prompt.createdAt).toLocaleDateString()}</span>
        </div>

        {/* Prompt Content */}
        <div className="bg-light-surface dark:bg-dark-surface p-10 rounded-none mb-16 border-2 border-light-border dark:border-dark-border shadow-sm">
          <pre className="font-mono text-sm text-light-text dark:text-dark-text whitespace-pre-wrap break-words leading-relaxed">
            {prompt.content}
          </pre>
        </div>

        {/* Copy Button */}
        <div className="flex justify-center mb-16">
          <CopyButton text={prompt.content} variant="large" />
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-2 gap-12 pb-16 border-b-2 border-light-border dark:border-dark-border mb-16">
          <div>
            <h3 className="text-xs font-serif text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wide mb-3">
              Use Case
            </h3>
            <p className="text-base text-light-text dark:text-dark-text leading-relaxed">{prompt.useCase}</p>
          </div>
          <div>
            <h3 className="text-xs font-serif text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wide mb-3">
              Tags
            </h3>
            <div className="flex flex-wrap gap-3">
              {prompt.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 text-xs bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text rounded-none border border-light-border dark:border-dark-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-12 mb-20">
          <div>
            <p className="text-xs font-serif text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wide mb-3">Rating</p>
            <p className="text-4xl font-serif font-light text-light-text dark:text-dark-text">
              {prompt.rating.toFixed(1)}
              <span className="text-lg text-light-text-secondary dark:text-dark-text-secondary"> / 5</span>
            </p>
          </div>
          <div>
            <p className="text-xs font-serif text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wide mb-3">Usage Count</p>
            <p className="text-4xl font-serif font-light text-light-text dark:text-dark-text">
              {prompt.usageCount.toLocaleString()}
              <span className="text-lg text-light-text-secondary dark:text-dark-text-secondary"> uses</span>
            </p>
          </div>
        </div>

        {/* Related Prompts */}
        {relatedPrompts.length > 0 && (
          <div className="border-t-2 border-light-border dark:border-dark-border pt-16">
            <h2 className="text-3xl font-serif font-light text-light-text dark:text-dark-text mb-12 tracking-wide">
              Related Prompts
            </h2>
            <div className="space-y-12">
              {relatedPrompts.map((relatedPrompt) => (
                <PromptCard key={relatedPrompt.id} prompt={relatedPrompt} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
