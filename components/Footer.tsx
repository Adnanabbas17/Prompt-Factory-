import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t-2 border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div>
            <h3 className="font-serif text-xl font-light text-light-text dark:text-dark-text mb-4">Prompt Factory</h3>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary max-w-xs leading-relaxed">
              Zero-cost, community-driven prompt marketplace. Discover, share, and improve AI prompts.
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <h4 className="text-sm font-serif font-light text-light-text dark:text-dark-text mb-4">Project</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://github.com/adnanabbas17/prompt-factory-"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent dark:hover:text-dark-accent hover:underline transition-colors"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-serif font-light text-light-text dark:text-dark-text mb-4">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent dark:hover:text-dark-accent hover:underline transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-light-border dark:border-dark-border mt-12 pt-12 text-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
          <p>
            Built with ❤️ by <a href="https://twitter.com/adnanabbas17" target="_blank" rel="noopener noreferrer" className="hover:text-light-accent dark:hover:text-dark-accent hover:underline transition-colors">Adnan Abbas</a>
          </p>
          <p className="mt-3">© {new Date().getFullYear()} Prompt Factory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
