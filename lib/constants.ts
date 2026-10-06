import type { Prompt } from './types';

// Darker shades in light mode keep text above WCAG AA contrast.
// The existing five colors are reused; related categories share one.
const GOLD = 'text-[#8A6A3D] dark:text-[#C9A87A]';
const GREEN = 'text-[#4F7040] dark:text-[#8FA87A]';
const COPPER = 'text-[#8F613C] dark:text-[#D4A574]';
const MAUVE = 'text-[#8C5F78] dark:text-[#B8899F]';
const TEAL = 'text-[#3F7670] dark:text-[#7FA8A3]';

// Single source of truth for categories (docx order). Names must match the category
// values in public/data/prompts.json; scripts/validate-prompts.py checks this list.
export const CATEGORY_DEFS = [
  { name: 'Writing & Editing', text: GOLD },
  { name: 'Career & Job Search', text: COPPER },
  { name: 'Business, Strategy & Product', text: COPPER },
  { name: 'Marketing, Sales & Support', text: COPPER },
  { name: 'Productivity & Meetings', text: GREEN },
  { name: 'Coding & Software Engineering', text: GREEN },
  { name: 'Data, Research & Analysis', text: TEAL },
  { name: 'Learning & Teaching', text: TEAL },
  { name: 'Prompt Engineering (Meta-Prompts)', text: MAUVE },
  { name: 'Personal & Lifestyle', text: GOLD },
  { name: 'Creative Writing', text: GOLD },
] as const;

export type Category = (typeof CATEGORY_DEFS)[number]['name'];

export const CATEGORIES: Category[] = CATEGORY_DEFS.map((c) => c.name);
export const CATEGORY_TEXT = Object.fromEntries(CATEGORY_DEFS.map((c) => [c.name, c.text])) as Record<
  Category,
  string
>;

export const DIFFICULTIES: Prompt['difficulty'][] = ['Beginner', 'Intermediate', 'Advanced'];
