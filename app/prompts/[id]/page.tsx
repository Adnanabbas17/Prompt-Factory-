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
  Writing: '#A78BFA',
  Coding: '#34D399',
  Analysis: '#F97316',
  Brainstorm: '#EC4899',
  Teaching: '#06B6D4',
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
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-5 md:px-10 py-16">
          <div className="space-y-8">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
            <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !prompt) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-5 md:px-10 py-16">
          <Link href="/" className="text-sm text-blue-500 dark:text-blue-400 hover:underline mb-8 inline-block">
            ← Back
          </Link>
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Prompt not found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The prompt you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/" className="text-blue-500 dark:text-blue-400 hover:underline">
              Back to all prompts
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-5 md:px-10 py-16">
        {/* Back Link */}
        <Link href="/" className="text-sm text-blue-500 dark:text-blue-400 hover:underline mb-8 inline-block">
          ← Back
        </Link>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {prompt.title}
        </h1>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-12">
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
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-sm mb-12 border border-gray-200 dark:border-gray-800">
          <pre className="font-mono text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words leading-relaxed">
            {prompt.content}
          </pre>
        </div>

        {/* Copy Button */}
        <div className="flex justify-center mb-12">
          <CopyButton text={prompt.content} variant="large" />
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-2 gap-8 pb-12 border-b border-gray-200 dark:border-gray-700 mb-12">
          <div>
            <h3 className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
              Use Case
            </h3>
            <p className="text-base text-gray-900 dark:text-gray-100">{prompt.useCase}</p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {prompt.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-8 mb-16">
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Rating</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {prompt.rating.toFixed(1)}
              <span className="text-lg text-gray-600 dark:text-gray-400"> / 5</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Usage Count</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {prompt.usageCount.toLocaleString()}
              <span className="text-lg text-gray-600 dark:text-gray-400"> uses</span>
            </p>
          </div>
        </div>

        {/* Related Prompts */}
        {relatedPrompts.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
              Related Prompts
            </h2>
            <div className="space-y-8">
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
