/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        primary: 'hsl(var(--primary) / <alpha-value>)',
        'primary-hover': 'hsl(var(--primary-hover) / <alpha-value>)',
        accent: 'hsl(var(--accent) / <alpha-value>)',
        'accent-hover': 'hsl(var(--accent-hover) / <alpha-value>)',
        text: 'hsl(var(--text) / <alpha-value>)',
        'text-secondary': 'hsl(var(--text-secondary) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};