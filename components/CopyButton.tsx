'use client';

import { useEffect, useRef, useState } from 'react';

interface CopyButtonProps {
  text: string;
  variant?: 'small' | 'large';
}

async function writeToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through to the legacy path (insecure context or permission denied).
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

export default function CopyButton({ text, variant = 'large' }: CopyButtonProps) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleCopy = async () => {
    const ok = await writeToClipboard(text);
    setStatus(ok ? 'copied' : 'error');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus('idle'), 2000);
  };

  const announcement = status === 'copied' ? 'Copied to clipboard' : status === 'error' ? 'Copy failed' : '';

  if (variant === 'small') {
    return (
      <>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy prompt to clipboard"
          title={status === 'copied' ? 'Copied!' : 'Copy to clipboard'}
          className="p-2 text-light-text-secondary transition-colors hover:text-light-link dark:text-dark-text-secondary dark:hover:text-dark-accent"
        >
          {status === 'copied' ? (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          )}
        </button>
        <span role="status" className="sr-only">
          {announcement}
        </span>
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        className="bg-light-link px-8 py-4 font-serif text-base font-light text-white shadow-sm transition-all hover:opacity-90 hover:shadow-md dark:bg-dark-accent dark:text-dark-bg"
      >
        {status === 'copied' ? '✓ Copied!' : status === 'error' ? 'Copy failed' : 'Copy to Clipboard'}
      </button>
      <span role="status" className="sr-only">
        {announcement}
      </span>
    </>
  );
}
