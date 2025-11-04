# ⚡ Codementor Frontend — Vue 3 + Vite + Tailwind CSS

A modular **Vue 3 + Vite** project structured for three separate entry points:

* **Main site** → `/src/main/`
* **Admin dashboard** → `/src/admin/`
* **API / Interactive coding** → `/src/api/`

Each entry has its own router and layout but shares global components, stores, and styles.

---

## 🧩 Prerequisites

Before you begin, ensure you have:

* **Node.js 18+** — [Download here](https://nodejs.org/)
* **npm** (comes with Node)

Check your versions:

```bash
node -v
npm -v
```

---

## 📦 Installation

In your project directory, run:

```bash
npm install
```

This installs all required dependencies from `package.json`.

### Dependencies

* `vue` — Core Vue 3 framework
* `vue-router` — Page routing
* `pinia` — State management
* `pinia-plugin-persistedstate` — Store persistence
* `dayjs` — Date and time formatting
* `clsx` — Conditional class helper
* `chart.js` — Charting library for analytics
* `@fortawesome/fontawesome-free` — Font Awesome icons

### Dev Dependencies

* `vite` — Build tool and dev server
* `@vitejs/plugin-vue` — Vue support for Vite
* `tailwindcss`, `postcss`, `autoprefixer` — Styling tools

---

## 🧰 Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the local development server   |
| `npm run build`   | Build the project for production     |
| `npm run preview` | Preview the production build locally |

---

## 🚀 Running the Project

To start the development server:

```bash
npm run dev
```

Example output:

```
VITE v7.1.x  ready in 500ms
➜  Local: http://localhost:5173/
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.
Each HTML entry (index.html, admin.html, api.html) serves a different Vue app.

---

## 🏗️ Building for Production

To create an optimized production build:

```bash
npm run build
```

To preview the build:

```bash
npm run preview
```

---

## 🧩 Project Structure

```
codementor-frontend/
├─ index.html              # Public entry
├─ admin.html              # Admin dashboard entry
├─ api.html                # API / coding interface entry
├─ package.json
├─ vite.config.js          # Multi-entry Vite config
├─ tailwind.config.js      # Tailwind setup
├─ postcss.config.js       # CSS processor config
├─ public/                 # Static assets served as-is
│   └─ vite.svg
└─ src/
   ├─ assets/              # Images, fonts, icons
   ├─ components/          # Reusable UI components
   │   ├─ layout/          # Header, Footer, Sidebar
   │   └─ ui/              # Buttons, Pagination, etc.
   ├─ consumables/         # Reusable logic (useAuth, useApi, etc.)
   ├─ store/               # Shared Pinia stores
   ├─ styles/              # Tailwind & global CSS
   ├─ main/                # Public-facing app (Home, Learn, Challenge)
   ├─ admin/               # Admin dashboard (Users, Analytics)
   └─ api/                 # Interactive coding environment
```

---

## 🧠 Notes

* Each entry (`main`, `admin`, `api`) has its own `main.js`, `router.js`, and layout folder.
* Routes use meta fields like `layout`, `requiresAuth`, and `guestOnly` to control navigation and design.
* Global state (user, submissions, settings) is shared through **Pinia**.
* Styles and components are consistent across all sections.

---

## 🛠️ Troubleshooting

If you encounter Tailwind or PostCSS errors, try reinstalling:

```bash
npm uninstall tailwindcss postcss autoprefixer
npm install -D tailwindcss postcss autoprefixer
```

Make sure:

* `postcss.config.js` uses CommonJS (`module.exports = {}`)
* `"type": "module"` is in your `package.json`
* Tailwind CSS version is up-to-date

---

## ✅ Done!

You now have a fully functional **Vue 3 + Vite + Tailwind CSS** project with modular structure.
Run:

```bash
npm run dev
```

and start building your frontend apps!
