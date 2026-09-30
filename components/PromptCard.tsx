'use client';

import Link from 'next/link';
import { Prompt } from '@/lib/types';
import CopyButton from './CopyButton';
import { useState } from 'react';

interface PromptCardProps {
  prompt: Prompt;
}

const categoryColors: Record<string, string> = {
  Writing: '#A78BFA',
  Coding: '#34D399',
  Analysis: '#F97316',
  Brainstorm: '#EC4899',
  Teaching: '#06B6D4',
};

export default function PromptCard({ prompt }: PromptCardProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="border-b border-gray-200 dark:border-gray-700 pb-8 transition-all duration-150 group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex items-start justify-between gap-4">
        <Link href={`/prompts/${prompt.id}`} className="flex-1 group">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2 group-hover:opacity-70 transition-opacity">
            {prompt.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
            {prompt.description}
          </p>
        </Link>

        {isHovering && (
          <div className="flex-shrink-0 animate-fadeIn">
            <CopyButton text={prompt.content} variant="small" />
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
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
        <span className="text-gray-600 dark:text-gray-400">{prompt.difficulty}</span>
      </div>
    </div>
  );
}
