'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    if (!mounted) return;

    const html = document.documentElement;
    const isDarkMode = html.classList.contains('dark');

    if (isDarkMode) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
      <div className="max-w-7xl mx-auto px-5 md:px-10 h-15 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:opacity-80 transition-opacity">
            Prompt Factory
          </div>
        </Link>

        <nav className="flex items-center gap-8">
          <a
            href="https://github.com/adnanabbas17/prompt-factory-"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            GitHub
          </a>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isDark ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-2.83-2.83a1 1 0 00-1.414 1.414l2.83 2.83a1 1 0 001.414-1.414zM2.05 6.464l2.83 2.83a1 1 0 101.414-1.414L3.464 5.05a1 1 0 00-1.414 1.414zM5.464 5.465a1 1 0 00-1.414-1.414l-2.83 2.83a1 1 0 001.414 1.414l2.83-2.83zm9.172 9.172a1 1 0 001.414-1.414l-2.83-2.83a1 1 0 00-1.414 1.414l2.83 2.83zM10 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm0 14a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm8-8a1 1 0 110 2h-2a1 1 0 110-2h2zm-14 0a1 1 0 110 2H2a1 1 0 110-2h2z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
