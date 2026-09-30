'use client';

import { CATEGORIES, DIFFICULTIES } from '@/lib/constants';

interface FilterBarProps {
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  selectedDifficulty: string | null;
  onDifficultyChange: (difficulty: string | null) => void;
  sortBy: 'recent' | 'popular' | 'rating';
  onSortChange: (sort: 'recent' | 'popular' | 'rating') => void;
  hasActiveFilters: boolean;
  onReset: () => void;
}

export default function FilterBar({
  selectedCategories,
  onCategoryChange,
  selectedDifficulty,
  onDifficultyChange,
  sortBy,
  onSortChange,
  hasActiveFilters,
  onReset,
}: FilterBarProps) {
  return (
    <div className="w-full max-w-7xl mx-auto mb-16 space-y-4">
      <div className="flex flex-wrap gap-6 items-center">
        <div className="flex flex-wrap gap-6">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={selectedCategories.includes(category)}
              onClick={() => onCategoryChange(category)}
              className={`border-b-2 px-0 py-2 text-sm transition-colors ${
                selectedCategories.includes(category)
                  ? 'border-light-accent font-medium text-light-text dark:border-dark-accent dark:text-dark-text'
                  : 'border-transparent text-light-text-secondary hover:text-light-text dark:text-dark-text-secondary dark:hover:text-dark-text'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="difficulty" className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            Difficulty:
          </label>
          <select
            id="difficulty"
            value={selectedDifficulty || ''}
            onChange={(e) => onDifficultyChange(e.target.value || null)}
            className="text-sm px-3 py-2 border-b-2 border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text focus-visible:outline-none focus-visible:border-light-accent dark:focus-visible:border-dark-accent transition-colors"
          >
            <option value="">All</option>
            {DIFFICULTIES.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            Sort:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as 'recent' | 'popular' | 'rating')}
            className="text-sm px-3 py-2 border-b-2 border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text focus-visible:outline-none focus-visible:border-light-accent dark:focus-visible:border-dark-accent transition-colors"
          >
            <option value="recent">Recent</option>
            <option value="popular">Popular</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="text-sm text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text underline transition-colors ml-auto"
          >
            Reset filters
          </button>
        )}
      </div>
    </div>
  );
}
