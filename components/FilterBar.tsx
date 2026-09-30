'use client';

const CATEGORIES = ['Writing', 'Coding', 'Analysis', 'Brainstorm', 'Teaching'];
const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];

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
    <div className="w-full max-w-7xl mx-auto mb-12 space-y-4">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`text-sm px-3 py-1 transition-colors ${
                selectedCategories.includes(category)
                  ? 'text-gray-900 dark:text-gray-100 border-b-2 border-blue-500'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="difficulty" className="text-sm text-gray-600 dark:text-gray-400">
            Difficulty:
          </label>
          <select
            id="difficulty"
            value={selectedDifficulty || ''}
            onChange={(e) => onDifficultyChange(e.target.value || null)}
            className="text-sm px-3 py-1 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 focus-visible:outline-none focus-visible:border-blue-500 dark:focus-visible:border-blue-400"
          >
            <option value="">All</option>
            {DIFFICULTIES.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-gray-600 dark:text-gray-400">
            Sort:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as 'recent' | 'popular' | 'rating')}
            className="text-sm px-3 py-1 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 focus-visible:outline-none focus-visible:border-blue-500 dark:focus-visible:border-blue-400"
          >
            <option value="recent">Recent</option>
            <option value="popular">Popular</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 underline transition-colors ml-auto"
          >
            Reset filters
          </button>
        )}
      </div>
    </div>
  );
}
