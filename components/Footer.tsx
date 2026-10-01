export default function Footer() {
  return (
    <footer className="mt-24 border-t-2 border-light-border bg-light-surface dark:border-dark-border dark:bg-dark-surface">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="flex flex-col items-start justify-between gap-12 md:flex-row">
          <div>
            <h3 className="mb-4 font-serif text-xl font-light text-light-text dark:text-dark-text">Prompt Factory</h3>
            <p className="max-w-xs text-sm leading-relaxed text-light-text-secondary dark:text-dark-text-secondary">
              Zero-cost, community-driven prompt marketplace. Discover, share, and improve AI prompts.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-serif text-sm font-light text-light-text dark:text-dark-text">Project</h4>
            <a
              href="https://github.com/adnanabbas17/prompt-factory-"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-light-text-secondary transition-colors hover:text-light-link hover:underline dark:text-dark-text-secondary dark:hover:text-dark-accent"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-12 border-t-2 border-light-border pt-12 text-center text-sm text-light-text-secondary dark:border-dark-border dark:text-dark-text-secondary">
          <p>
            Built by{' '}
            <a
              href="https://github.com/adnanabbas17"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-light-link hover:underline dark:hover:text-dark-accent"
            >
              Adnan Abbas
            </a>
          </p>
          <p className="mt-3">
            Includes prompts from thibaultyou/prompt-library (MIT License, Copyright (c) 2024 Thibault YOU)
          </p>
          <p className="mt-3">© {new Date().getFullYear()} Prompt Factory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
