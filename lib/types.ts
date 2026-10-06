import type { Category } from './constants';

export interface Prompt {
  id: string;
  title: string;
  description: string;
  category: Category;
  tags: string[];
  author: string;
  source: string;
  license: string;
  sourceUrl: string;
  content: string;
  useCase: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  variables: string[];
  createdAt: string;
  // Not present for the curated library; shown in the UI only when set.
  rating?: number;
  usageCount?: number;
}

export interface SearchFilters {
  query: string;
  categories: string[];
  difficulty: string | null;
}
