// tailwind.config.js
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './index.html',
    './admin.html',
    './api.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        pri: {
          50: 'var(--pri-50)',
          100: 'var(--pri-100)',
          200: 'var(--pri-200)',
          300: 'var(--pri-300)',
          400: 'var(--pri-400)',
          500: 'var(--pri-500)',
          600: 'var(--pri-600)',
          700: 'var(--pri-700)',
          800: 'var(--pri-800)',
          900: 'var(--pri-900)',
        },
        gry: {
          50: 'var(--gry-50)',
          100: 'var(--gry-100)',
          200: 'var(--gry-200)',
          300: 'var(--gry-300)',
          400: 'var(--gry-400)',
          500: 'var(--gry-500)',
          600: 'var(--gry-600)',
          700: 'var(--gry-700)',
          800: 'var(--gry-800)',
          900: 'var(--gry-900)',
        },
        // Accent Colors
        'acc-grn': {
          500: 'var(--acc-grn-500)',
          600: 'var(--acc-grn-600)',
        },
        'acc-org': {
          500: 'var(--acc-org-500)',
          600: 'var(--acc-org-600)',
        },
        'acc-ind': {
          500: 'var(--acc-ind-500)',
          600: 'var(--acc-ind-600)',
        },
        'acc-red': {
          500: 'var(--acc-red-500)',
          600: 'var(--acc-red-600)',
        },
      },
    }
  },
  plugins: [],
}