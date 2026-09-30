/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#FFFAF5',
          surface: '#F9F5F0',
          text: '#3D3D3D',
          'text-secondary': '#8B8B7E',
          border: '#E8DFD5',
          accent: '#C4956F',
          success: '#8FA87A',
          warning: '#D4A574',
        },
        dark: {
          bg: '#1A1815',
          surface: '#2A2520',
          text: '#F5F0EB',
          'text-secondary': '#A89F94',
          border: '#3D3733',
          accent: '#D4A574',
          success: '#8FA87A',
          warning: '#D4A574',
        },
        category: {
          writing: '#C9A87A',
          coding: '#8FA87A',
          analysis: '#C4956F',
          brainstorm: '#B8899F',
          teaching: '#7FA8A3',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Garamond', 'serif'],
        sans: ['"Segoe UI"', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'sans-serif'],
        mono: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      fontSize: {
        xs: '14px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '24px',
        '2xl': '28px',
        '3xl': '36px',
        '4xl': '48px',
      },
      lineHeight: {
        tight: '1.3',
        normal: '1.6',
        relaxed: '1.8',
      },
      letterSpacing: {
        tight: '-0.02em',
        normal: '0em',
        wide: '0.5px',
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
        '6xl': '80px',
      },
      boxShadow: {
        sm: '0 2px 8px rgba(0, 0, 0, 0.06)',
        md: '0 4px 12px rgba(0, 0, 0, 0.08)',
        none: 'none',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
      animation: {
        fadeIn: 'fadeIn 200ms ease-in-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
