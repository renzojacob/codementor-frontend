// tailwind.config.js

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  plugins: [],
    theme: {
    extend: {
      colors: {
        primary: {
          50: "var(--pri-50)",
          100: "var(--pri-100)",
          200: "var(--pri-200)",
          300: "var(--pri-300)",
          400: "var(--pri-400)",
          500: "var(--pri-500)",
          600: "var(--pri-600)",
          700: "var(--pri-700)",
          800: "var(--pri-800)",
          900: "var(--pri-900)",
        }
      }
    }
  },
}