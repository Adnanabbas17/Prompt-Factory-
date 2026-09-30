export interface Prompt {
  id: string;
  title: string;
  description: string;
  category: 'Writing' | 'Coding' | 'Analysis' | 'Brainstorm' | 'Teaching';
  tags: string[];
  author: string;
  content: string;
  useCase: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  createdAt: string;
  rating: number;
  usageCount: number;
}

export interface SearchFilters {
  query: string;
  categories: string[];
  difficulty: string | null;
  sortBy: 'recent' | 'popular' | 'rating';
}
