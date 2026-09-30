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
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24">
          <div className="space-y-12">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-8 bg-light-surface dark:bg-dark-surface rounded-none w-3/4 animate-pulse" />
                <div className="h-4 bg-light-surface dark:bg-dark-surface rounded-none w-full animate-pulse" />
                <div className="h-4 bg-light-surface dark:bg-dark-surface rounded-none w-1/2 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-32">
        {/* Hero Section */}
        <div className="mb-24">
          <h1 className="text-5xl md:text-6xl font-serif font-light text-light-text dark:text-dark-text mb-6 tracking-wide">
            Prompt Factory
          </h1>
          <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl leading-relaxed">
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
        <div className="mb-12 text-sm text-light-text-secondary dark:text-dark-text-secondary">
          Showing {filteredPrompts.length} of {prompts.length} prompts
        </div>

        {/* Prompts Grid */}
        {filteredPrompts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-light-text-secondary dark:text-dark-text-secondary text-base leading-relaxed">
              No prompts found. Try adjusting your filters or search query.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredPrompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
