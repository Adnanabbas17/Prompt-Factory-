import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#FFFFFF',
          surface: '#F9FAFB',
          text: '#111827',
          'text-secondary': '#6B7280',
          border: '#E5E7EB',
          accent: '#3B82F6',
          success: '#10B981',
          warning: '#F59E0B',
        },
        dark: {
          bg: '#0F172A',
          surface: '#1E293B',
          text: '#F1F5F9',
          'text-secondary': '#94A3B8',
          border: '#334155',
          accent: '#60A5FA',
          success: '#34D399',
          warning: '#FBBF24',
        },
        category: {
          writing: '#A78BFA',
          coding: '#34D399',
          analysis: '#F97316',
          brainstorm: '#EC4899',
          teaching: '#06B6D4',
        },
      },
      fontFamily: {
        sans: ['"Anthropic Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      fontSize: {
        xs: '13px',
        sm: '14px',
        base: '15px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '32px',
      },
      lineHeight: {
        tight: '1.3',
        normal: '1.5',
        relaxed: '1.7',
      },
      letterSpacing: {
        tight: '-0.02em',
        normal: '0em',
        wide: '+0.3px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '32px',
        '4xl': '40px',
        '5xl': '60px',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
        none: 'none',
      },
      transitionDuration: {
        DEFAULT: '150ms',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};

export default config;
