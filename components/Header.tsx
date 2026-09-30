'use client';

import Link from 'next/link';

export default function Header() {
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch {
      // Storage unavailable (private mode); theme still applies for this session.
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-light-border bg-light-bg shadow-sm dark:border-dark-border dark:bg-dark-bg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="font-serif text-2xl font-light text-light-text transition-opacity hover:opacity-75 dark:text-dark-text"
        >
          Prompt Factory
        </Link>

        <nav className="flex items-center gap-8">
          <a
            href="https://github.com/adnanabbas17/prompt-factory-"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-light-text-secondary transition-colors hover:text-light-text hover:underline dark:text-dark-text-secondary dark:hover:text-dark-text"
          >
            GitHub
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="p-2 text-light-text-secondary transition-colors hover:text-light-text dark:text-dark-text-secondary dark:hover:text-dark-text"
          >
            <svg className="hidden h-5 w-5 dark:block" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
            <svg className="block h-5 w-5 dark:hidden" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}
