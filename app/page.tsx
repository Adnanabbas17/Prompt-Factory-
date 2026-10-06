'use client';

import { useEffect, useMemo, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import PromptCard from '@/components/PromptCard';
import { prompts, searchPrompts } from '@/lib/prompts';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 200);
    return () => clearTimeout(timer);
  }, [query]);

  const filteredPrompts = useMemo(
    () =>
      searchPrompts({
        query: debouncedQuery,
        categories: selectedCategories,
        difficulty: selectedDifficulty,
      }),
    [debouncedQuery, selectedCategories, selectedDifficulty]
  );

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleReset = () => {
    setQuery('');
    setDebouncedQuery('');
    setSelectedCategories([]);
    setSelectedDifficulty(null);
  };

  const hasActiveFilters = query.length > 0 || selectedCategories.length > 0 || selectedDifficulty !== null;

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-32">
      <div className="mb-24">
        <h1 className="mb-6 text-5xl font-light text-light-text dark:text-dark-text md:text-6xl">Prompt Factory</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-light-text-secondary dark:text-dark-text-secondary">
          Zero-cost, community-driven prompt marketplace. Discover, share, and improve AI prompts.
        </p>
      </div>

      <SearchBar value={query} onChange={setQuery} />

      <FilterBar
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryToggle}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
        hasActiveFilters={hasActiveFilters}
        onReset={handleReset}
      />

      <p role="status" className="mb-12 text-sm text-light-text-secondary dark:text-dark-text-secondary">
        Showing {filteredPrompts.length} of {prompts.length} prompts
      </p>

      {filteredPrompts.length === 0 ? (
        <p className="py-20 text-center text-base leading-relaxed text-light-text-secondary dark:text-dark-text-secondary">
          No prompts found. Try adjusting your filters or search query.
        </p>
      ) : (
        <div className="space-y-12">
          {filteredPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      )}
    </div>
  );
}
