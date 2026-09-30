import type { Prompt } from './types';

export const CATEGORIES: Prompt['category'][] = ['Writing', 'Coding', 'Analysis', 'Brainstorm', 'Teaching'];
export const DIFFICULTIES: Prompt['difficulty'][] = ['Beginner', 'Intermediate', 'Advanced'];

// Darker shades in light mode keep text above WCAG AA contrast.
export const CATEGORY_TEXT: Record<Prompt['category'], string> = {
  Writing: 'text-[#8A6A3D] dark:text-[#C9A87A]',
  Coding: 'text-[#4F7040] dark:text-[#8FA87A]',
  Analysis: 'text-[#8F613C] dark:text-[#D4A574]',
  Brainstorm: 'text-[#8C5F78] dark:text-[#B8899F]',
  Teaching: 'text-[#3F7670] dark:text-[#7FA8A3]',
};
