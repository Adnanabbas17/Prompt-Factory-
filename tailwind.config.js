/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#FFFAF5',
          surface: '#F9F5F0',
          text: '#3D3D3D',
          'text-secondary': '#6B6B5F',
          border: '#E8DFD5',
          accent: '#C4956F',
          // Darker gold for text and filled buttons (WCAG AA on light bg)
          link: '#8F613C',
        },
        dark: {
          bg: '#1A1815',
          surface: '#2A2520',
          text: '#F5F0EB',
          'text-secondary': '#A89F94',
          border: '#3D3733',
          accent: '#D4A574',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Garamond', 'serif'],
        sans: ['"Segoe UI"', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'sans-serif'],
        mono: ['Menlo', 'Monaco', '"Courier New"', 'monospace'],
      },
      fontSize: {
        xs: ['14px', '1.6'],
        sm: ['14px', '1.6'],
        base: ['16px', '1.6'],
        lg: ['18px', '1.6'],
        xl: ['24px', '1.3'],
        '2xl': ['28px', '1.3'],
        '3xl': ['36px', '1.3'],
        '4xl': ['48px', '1.2'],
      },
      lineHeight: {
        normal: '1.6',
        relaxed: '1.8',
      },
      letterSpacing: {
        wide: '0.5px',
      },
      boxShadow: {
        sm: '0 2px 8px rgba(0, 0, 0, 0.06)',
        md: '0 4px 12px rgba(0, 0, 0, 0.08)',
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
  plugins: [],
};
