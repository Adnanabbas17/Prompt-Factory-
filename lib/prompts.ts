import data from '@/public/data/prompts.json';
import { Prompt, SearchFilters } from './types';

export const prompts: Prompt[] = (data as { prompts: Prompt[] }).prompts;

export function getPromptById(id: string): Prompt | undefined {
  return prompts.find((p) => p.id === id);
}

export function searchPrompts(filters: SearchFilters, list: Prompt[] = prompts): Prompt[] {
  let results = list;
  const query = filters.query.trim().toLowerCase();

  if (query) {
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  if (filters.categories.length > 0) {
    results = results.filter((p) => filters.categories.includes(p.category));
  }

  if (filters.difficulty) {
    results = results.filter((p) => p.difficulty === filters.difficulty);
  }

  return sortPrompts(results, filters.sortBy);
}

function sortPrompts(list: Prompt[], sortBy: SearchFilters['sortBy']): Prompt[] {
  const sorted = [...list];

  switch (sortBy) {
    case 'popular':
      return sorted.sort((a, b) => b.usageCount - a.usageCount);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'recent':
    default:
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}

export function getRelatedPrompts(prompt: Prompt, limit = 3): Prompt[] {
  return prompts.filter((p) => p.category === prompt.category && p.id !== prompt.id).slice(0, limit);
}
