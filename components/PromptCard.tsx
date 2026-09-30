'use client';

import Link from 'next/link';
import { Prompt } from '@/lib/types';
import CopyButton from './CopyButton';
import { useState } from 'react';

interface PromptCardProps {
  prompt: Prompt;
}

const categoryColors: Record<string, string> = {
  Writing: '#C9A87A',
  Coding: '#8FA87A',
  Analysis: '#C4956F',
  Brainstorm: '#B8899F',
  Teaching: '#7FA8A3',
};

export default function PromptCard({ prompt }: PromptCardProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="border-b-2 border-light-border dark:border-dark-border pb-10 transition-all duration-200 group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex items-start justify-between gap-4">
        <Link href={`/prompts/${prompt.id}`} className="flex-1">
          <h3 className="text-2xl font-serif text-light-text dark:text-dark-text mb-3 group-hover:opacity-75 transition-opacity">
            {prompt.title}
          </h3>
          <p className="text-base text-light-text-secondary dark:text-dark-text-secondary line-clamp-2 mb-4 leading-relaxed">
            {prompt.description}
          </p>
        </Link>

        {isHovering && (
          <div className="flex-shrink-0 animate-fadeIn">
            <CopyButton text={prompt.content} variant="small" />
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm text-light-text-secondary dark:text-dark-text-secondary">
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
      </div>
    </div>
  );
}
