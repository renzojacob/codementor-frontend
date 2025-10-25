# VITE + VUE 3 + TAILWIND CSS 4 SETUP GUIDE

This guide explains how to install all required dependencies and run your development server for this project.

---

## PREREQUISITES

Before you begin, make sure you have:

* Node.js version 18 or higher
  (Download from: [https://nodejs.org/](https://nodejs.org/))
* npm (comes with Node)

Check your versions:
node -v
npm -v

---

1. INSTALL DEPENDENCIES

---

In your project directory (C:\ViteVue\codementor-frontend), run:

```
npm install
```

This installs all dependencies listed in your package.json.

Dependencies:

* `vue` – Vue 3 framework
* `vue-router` – Router for Vue 3
* `pinia` – State management library
* `pinia-plugin-persistedstate` – Persistent state plugin
* `dayjs` – Lightweight date library
* `clsx` – Conditional class helper
* `chart.js` – Charting library
* `@fortawesome/fontawesome-free` – Font Awesome icons

Dev Dependencies:

* `vite` – Frontend build tool
* `@vitejs/plugin-vue` – Vue support for Vite
* `tailwindcss` – Utility-first CSS framework
* `@tailwindcss/postcss` – Tailwind's PostCSS plugin (v4+)
* `postcss` – CSS processor
* `autoprefixer` – Adds vendor prefixes

---

2. CONFIGURE TAILWIND CSS

---

Create a file named "tailwind.config.js" in your project root with this content:

```
export default {
  content: [
    './index.html',
    './admin.html',
    './api.html',
    './src/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Then create "postcss.config.js" with this content:

```
import tailwind from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [tailwind, autoprefixer],
};
```

Finally, in your main CSS file (e.g., src/style.css), add:

```
@import "tailwindcss";
```

---

3. SCRIPTS

---

Your package.json includes these scripts:

* npm run dev     → Start the local development server
* npm run build   → Build for production
* npm run preview → Preview the production build

---

4. RUNNING THE PROJECT

---

Start the development server with:

```
npm run dev
```

Expected output:

```
VITE v7.1.x ready in 500ms
  ➜ Local: http://localhost:5173/
```

Open your browser and go to [http://localhost:5173](http://localhost:5173)

---

5. BUILD FOR PRODUCTION

---

Create an optimized build:

```
npm run build
```

Preview the production build:

```
npm run preview
```

---

6. TROUBLESHOOTING

---

If you encounter Tailwind or PostCSS errors, try:

```
npm uninstall tailwindcss postcss autoprefixer @tailwindcss/postcss
npm install -D tailwindcss @tailwindcss/postcss postcss autoprefixer
```

Make sure that:

* postcss.config.js uses ESM syntax (export default)
* package.json includes "type": "module"
* You are using Tailwind CSS version 4 or higher

---

## EXAMPLE PROJECT STRUCTURE
```
codementor-frontend/
├─ index.html
├─ admin.html
├─ api.html
├─ public/                 # Static assets served as-is
├─ src/
│   ├─ assets/             # Images, fonts, icons, etc.
│   ├─ components/         # Reusable Vue components
│   ├─ composables/        # Vue composables (hooks)
│   ├─ store/              # Pinia stores (shared)
│   ├─ styles/             # Tailwind + global CSS
│   ├─ main/               # Public site entry
│   ├─ admin/              # Admin dashboard entry
│   ├─ api/                # API / interactive coding entry
├─ tailwind.config.js
├─ postcss.config.js
├─ vite.config.js
├─ package.json
└─ package-lock.json
```
---

## DONE!

You now have a working Vue 3 + Vite + Tailwind CSS 4 setup.
Run "npm run dev" and start building awesome UIs!
