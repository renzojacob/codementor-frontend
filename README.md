
# 🧭 Project Folder Structure Guide

**Updated:** November 2025  
**Goal:** Keep a clean, modular frontend architecture that’s easy to navigate, scale, and debug.

---

## 📁 Overview

This project uses a **feature-based folder structure**.  
Each feature (like `admin`, `learn`, `api`, etc.) manages its own **pages**, **components**, and **routes** — while global logic (state, API, utilities) stays centralized under `core/`.

### Top-Level Layout

```

src/
├─ app/
│  ├─ main.js
│  ├─ App.vue
│  └─ router/
│     ├─ index.js
│     └─ guards.js
│
├─ features/
│  ├─ admin/
│  │  ├─ pages/
│  │  │  ├─ Dashboard.vue
│  │  │  └─ Lessons.vue
│  │  ├─ components/
│  │  │  └─ LessonForm.vue
│  │  └─ routes.js
│  │
│  ├─ api/
│  │  ├─ pages/
│  │  │  ├─ CodeEditor.vue
│  │  │  └─ Submissions.vue
│  │  └─ routes.js
│  │
│  ├─ learn/
│  │  ├─ pages/
│  │  │  ├─ LearnHome.vue
│  │  │  ├─ LessonContent.vue
│  │  │  └─ LessonSidebar.vue
│  │  └─ routes.js
│  │
│  └─ auth/
│     ├─ pages/
│     │  ├─ Login.vue
│     │  ├─ Register.vue
│     │  └─ VerifyEmail.vue
│     └─ routes.js
│
├─ core/
│  ├─ api/
│  │  ├─ admin.js
│  │  ├─ auth.js
│  │  └─ learn.js
│  ├─ composables/
│  │  ├─ useAuth.js
│  │  ├─ useFetch.js
│  │  └─ useApi.js
│  ├─ http/
│  │  ├─ axios.js
│  │  └─ interceptors.js
│  ├─ store/
│  │  ├─ user.js
│  │  ├─ challenges.js
│  │  └─ index.js
│  └─ utils/
│     └─ constants.js
│
├─ components/
│  ├─ layout/
│  │  ├─ Header.vue
│  │  ├─ Sidebar.vue
│  │  └─ Footer.vue
│  └─ ui/
│     ├─ Button.vue
│     └─ Pagination.vue
│
├─ assets/
│  └─ images, svg, etc.
│
└─ styles/
├─ main.css
└─ variables.css

````

---

## 🧩 Feature Modules

Each folder inside `src/features/` is **self-contained**.  
It can include:
- `pages/` — route views for that feature  
- `components/` — smaller, reusable parts within the same feature  
- `routes.js` — route definitions for this feature  

Example (`src/features/admin/routes.js`):

```js
export default [
  {
    path: '/admin',
    component: () => import('@/app/layouts/AdminLayout.vue'),
    children: [
      { path: '', name: 'AdminDashboard', component: () => import('./pages/Dashboard.vue') },
      { path: 'lessons', name: 'AdminLessons', component: () => import('./pages/Lessons.vue') },
      { path: 'users', name: 'AdminUsers', component: () => import('./pages/Users.vue') }
    ]
  }
]
````

Example (`src/features/learn/routes.js`):

```js
export default [
  {
    path: '/learn',
    component: () => import('@/app/layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'LearnHome', component: () => import('./pages/LearnHome.vue') },
      { path: ':topic', name: 'LessonContent', component: () => import('./pages/LessonContent.vue') }
    ]
  }
]
```

---

## 🚦 Central Router Setup

Located in `src/app/router/index.js`

```js
import { createRouter, createWebHistory } from 'vue-router'

// Feature routes
import adminRoutes from '@/features/admin/routes'
import apiRoutes from '@/features/api/routes'
import authRoutes from '@/features/auth/routes'
import learnRoutes from '@/features/learn/routes'

const routes = [
  ...adminRoutes,
  ...apiRoutes,
  ...authRoutes,
  ...learnRoutes,
  { path: '/:pathMatch(.*)*', redirect: '/learn' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

Optional: add route guards in `src/app/router/guards.js` and import them here.

---

## ⚙️ Core Layer

`core/` holds logic shared across all features:

| Folder           | Purpose                                        |
| ---------------- | ---------------------------------------------- |
| **api/**         | Request functions (grouped by resource)        |
| **composables/** | Vue 3 composables (like `useAuth`, `useFetch`) |
| **http/**        | Axios config and interceptors                  |
| **store/**       | Global Pinia stores                            |
| **utils/**       | Constants and helpers                          |

---

## 🎨 Shared Components

Global UI and layout components live under `src/components/`.

| Folder    | Description                                           |
| --------- | ----------------------------------------------------- |
| `ui/`     | Reusable small elements (buttons, pagination, modals) |
| `layout/` | Site-wide structure (header, footer, sidebar)         |

Feature-specific components should **stay inside** their feature folder.

---

## 🧠 Mental Model

* `app/` → The shell (entry point, layouts, global routing)
* `features/` → Actual product sections
* `core/` → Logic and tools used everywhere
* `components/` → Shared visual building blocks

---

## 🚀 Benefits

✅ Easier to reason about — each feature is isolated
✅ No naming collisions between routes or components
✅ Simpler onboarding for new devs
✅ Scales nicely for both small and large teams
✅ Encourages code reuse (via `core/` and `components/`)

---

## 🧩 Adding a New Feature

1. Create a new folder under `src/features/yourFeature`
2. Add:

   * `pages/` for the route views
   * `components/` for internal feature components
   * `routes.js` to define your routes
3. Import it into `src/app/router/index.js`

---

## 📌 Notes

* Lazy-load pages with dynamic imports (`() => import('./pages/Page.vue')`)
* Keep composables small and scoped
* For Vue 3 + Vite, aliases like `@/` resolve to `src/`
* Use consistent naming: PascalCase for components, kebab-case for routes

---

## 🏁 Example Command Flow

```bash
# Run the app
npm run dev

# Build for production
npm run build

# Preview the built app
npm run preview
```

---

**Author:** Internal Project Docs
**Purpose:** Maintain consistent and readable structure across the codementor-frontend project.