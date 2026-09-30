'use client';

import { useEffect, useState, useMemo } from 'react';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import PromptCard from '@/components/PromptCard';
import { Prompt, SearchFilters } from '@/lib/types';
import { loadPrompts, searchPrompts } from '@/lib/prompts';

export default function HomePage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'rating'>('recent');

  useEffect(() => {
    const loadData = async () => {
      const data = await loadPrompts();
      setPrompts(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const filters: SearchFilters = {
    query,
    categories: selectedCategories,
    difficulty: selectedDifficulty,
    sortBy,
  };

  const filteredPrompts = useMemo(
    () => searchPrompts(filters, prompts),
    [filters, prompts]
  );

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleReset = () => {
    setQuery('');
    setSelectedCategories([]);
    setSelectedDifficulty(null);
    setSortBy('recent');
  };

  const hasActiveFilters =
    query.length > 0 || selectedCategories.length > 0 || selectedDifficulty !== null || sortBy !== 'recent';

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-20">
          <div className="space-y-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-24">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Prompt Factory
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Zero-cost, community-driven prompt marketplace. Discover, share, and improve AI prompts.
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar value={query} onChange={setQuery} />

        {/* Filter Bar */}
        <FilterBar
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryToggle}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
          sortBy={sortBy}
          onSortChange={setSortBy}
          hasActiveFilters={hasActiveFilters}
          onReset={handleReset}
        />

        {/* Results Count */}
        <div className="mb-8 text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredPrompts.length} of {prompts.length} prompts
        </div>

        {/* Prompts Grid */}
        {filteredPrompts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400 text-base">
              No prompts found. Try adjusting your filters or search query.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredPrompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
