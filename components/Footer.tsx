import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 mt-20">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">Prompt Factory</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              Zero-cost, community-driven prompt marketplace. Discover, share, and improve AI prompts.
            </p>
          </div>

          <div className="flex gap-8">
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-3">Project</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/adnanabbas17/prompt-factory-"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-3">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Built with ❤️ by <a href="https://twitter.com/adnanabbas17" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-gray-100">Adnan Abbas</a>
          </p>
          <p className="mt-2">© {new Date().getFullYear()} Prompt Factory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
