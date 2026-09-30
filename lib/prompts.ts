import { Prompt, SearchFilters } from './types';

let promptsCache: Prompt[] = [];

export async function loadPrompts(): Promise<Prompt[]> {
  if (promptsCache.length > 0) {
    return promptsCache;
  }

  const response = await fetch('/data/prompts.json');
  const data = await response.json();
  promptsCache = data.prompts || [];
  return promptsCache;
}

export function getPromptById(id: string, prompts: Prompt[]): Prompt | undefined {
  return prompts.find((p) => p.id === id);
}

export function searchPrompts(filters: SearchFilters, prompts: Prompt[]): Prompt[] {
  let results = [...prompts];

  if (filters.query) {
    const query = filters.query.toLowerCase();
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

  results = sortPrompts(results, filters.sortBy);

  return results;
}

function sortPrompts(prompts: Prompt[], sortBy: 'recent' | 'popular' | 'rating'): Prompt[] {
  const sorted = [...prompts];

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

export function getRelatedPrompts(prompt: Prompt, prompts: Prompt[], limit: number = 3): Prompt[] {
  return prompts
    .filter((p) => p.category === prompt.category && p.id !== prompt.id)
    .slice(0, limit);
}
