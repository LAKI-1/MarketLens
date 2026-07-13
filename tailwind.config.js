/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5',
          50:  '#EEEEFF',
          100: '#E0E0FF',
          200: '#C5C3FF',
          300: '#A9A5FF',
          400: '#8E87FF',
          500: '#7269FF',
          600: '#4F46E5',
          700: '#3730BE',
          800: '#231D97',
          900: '#110F70',
        },
        secondary: {
          DEFAULT: '#10B981',
          50:  '#ECFDF5',
          100: '#D1FAE5',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
        },
        tertiary: {
          DEFAULT: '#38BDF8',
          50:  '#F0F9FF',
          100: '#E0F2FE',
          400: '#38BDF8',
          500: '#0EA5E9',
        },
        ink: {
          DEFAULT: '#1E1F2E',
          deep:    '#16172A',
        },
        surface: {
          DEFAULT: '#F8F9FC',
          alt:     '#F1F3F8',
          bg:      '#FEFDFB',
        },
        brand: {
          border:  '#E4E5EC',
          muted:   '#F1F3F8',
          accent:  '#EEF0FA',
          neutral: '#64748B',
        },
      },
    },
  },
  plugins: [],
};
