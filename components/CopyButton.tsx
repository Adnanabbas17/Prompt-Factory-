'use client';

import { useState } from 'react';

interface CopyButtonProps {
  text: string;
  variant?: 'small' | 'large';
}

export default function CopyButton({ text, variant = 'large' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (variant === 'small') {
    return (
      <button
        onClick={handleCopy}
        aria-label="Copy to clipboard"
        title={copied ? 'Copied!' : 'Copy to clipboard'}
        className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent dark:hover:text-dark-accent transition-colors"
      >
        {copied ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className="px-8 py-4 bg-light-accent dark:bg-dark-accent text-white font-serif font-light text-base rounded-none hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-light-accent dark:focus-visible:ring-dark-accent shadow-sm hover:shadow-md"
    >
      {copied ? '✓ Copied!' : 'Copy to Clipboard'}
    </button>
  );
}
