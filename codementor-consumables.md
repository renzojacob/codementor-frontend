---

# 🧩 `src/consumables` Architecture Overview

This module centralizes all composables, HTTP utilities, and API clients used across the app.
It’s structured for **separation of concerns** and **scalable reusability**—each layer handles one responsibility:

* **`http/`** → Low-level HTTP configuration and token handling
* **`api/`** → Logical API endpoints, one file per domain
* **`composables/`** → Vue Composition API hooks for consuming API logic
* **`utils/`** → Shared constants or static configuration
* **`index.js`** → Public entry point that re-exports everything

---

## Directory Breakdown

### `index.js`

**Purpose:**
Central export hub for all consumables. It typically re-exports from `composables/` and `api/`, giving you imports like:

```js
import { useAuth, useTutorials } from '@/consumables'
```

**Connections:**

* Imports everything from `./composables` and `./api`
* No direct logic — just organization

---

### `http/`

#### `axios.js`

**Purpose:**
Creates and configures a single Axios instance. Handles:

* Base URL setup (`import.meta.env.VITE_API_URL`)
* Default headers (`Content-Type`, `Accept`, etc.)
* Integration of request/response interceptors

**Connections:**

* Uses `interceptors.js` for middleware logic
* Imports `tokenManager.js` for injecting auth tokens
* Exported instance is used by every file in `api/`

---

#### `interceptors.js`

**Purpose:**
Defines Axios interceptors for centralized behavior:

* **Request interceptor:** Adds auth token to headers before sending
* **Response interceptor:** Handles common errors (401, 403, 500)
* Optionally triggers global UI handlers (logout, toast notifications)

**Connections:**

* Imported and applied by `axios.js`
* Uses `tokenManager.js` for token retrieval/refresh
* May interact with `useAuth` (via event bus or store) for logout flows

---

#### `tokenManager.js`

**Purpose:**
Encapsulates all token-related logic:

* Storing tokens in `localStorage` or `sessionStorage`
* Getting/setting/clearing access & refresh tokens
* Refreshing expired tokens (if backend supports it)

**Connections:**

* Used by `interceptors.js` for injecting or refreshing tokens
* Used by `useAuth.js` to persist login/logout state

---

### `api/`

Each file exports endpoint-specific API functions that wrap the configured Axios instance.

#### `auth.js`

**Purpose:**
Handles authentication endpoints such as:

```js
login(credentials)
logout()
refreshToken()
getProfile()
```

**Connections:**

* Uses Axios instance from `http/axios.js`
* Called by `useAuth.js`

---

#### `admin.js`

**Purpose:**
Endpoints for admin functionality (user management, metrics, etc.)

**Connections:**

* Uses Axios instance from `http/axios.js`
* Consumed by potential future composables (e.g. `useAdmin.js`)

---

#### `tutorials.js`

**Purpose:**
Endpoints related to tutorials:

```js
getAllTutorials()
getTutorialById(id)
createTutorial(data)
updateTutorial(id, data)
deleteTutorial(id)
```

**Connections:**

* Uses Axios instance from `http/axios.js`
* Consumed by `useTutorials.js`

---

#### `index.js`

**Purpose:**
Collects and re-exports all domain API modules for easy import:

```js
export * as AuthAPI from './auth'
export * as TutorialsAPI from './tutorials'
```

**Connections:**

* Imported by `useApi.js` or `index.js` at the root of `consumables/`

---

### `composables/`

#### `useApi.js`

**Purpose:**
Acts as a centralized access layer for API modules. Simplifies how Vue components interact with the backend.

Example:

```js
import { useApi } from '@/consumables'

const { AuthAPI, TutorialsAPI } = useApi()
```

**Connections:**

* Imports all modules from `api/index.js`
* Used by other composables (`useAuth`, `useTutorials`)

---

#### `useAuth.js`

**Purpose:**
Manages authentication state and logic using Vue reactivity.
Typical structure:

```js
const user = ref(null)
const isAuthenticated = computed(() => !!user.value)
const login = async (creds) => { ... }
const logout = async () => { ... }
```

**Connections:**

* Uses `AuthAPI` from `useApi.js`
* Uses `tokenManager.js` to persist tokens
* Can be accessed globally via `provide/inject` or Pinia

---

#### `useDate.js`

**Purpose:**
A utility composable for date formatting and manipulation.
Examples:

```js
formatDate(date, pattern)
timeAgo(date)
isToday(date)
```

**Connections:**

* Pure utility — no dependencies
* Used by any component or composable needing date operations

---

#### `useFetch.js`

**Purpose:**
Legacy or generic data-fetching composable that predates `useApi`.
Handles:

* Reactive `data`, `loading`, and `error` states
* Manual or auto-fetching from any URL

**Connections:**

* May use `fetch` or `axios` directly
* Considered deprecated in favor of domain-specific composables

---

#### `useTutorials.js`

**Purpose:**
Manages tutorial data and state for components.
Provides reactive getters and methods:

```js
const tutorials = ref([])
const fetchTutorials = async () => { ... }
const getTutorial = (id) => { ... }
```

**Connections:**

* Uses `TutorialsAPI` via `useApi`
* May use `useDate` for date formatting

---

### `utils/constants.js`

**Purpose:**
Holds configuration values and static constants:

* API endpoints, routes, environment flags
* Enumerations (roles, statuses, etc.)

**Connections:**

* Used by multiple composables and API modules

---

## 🧭 Flow Summary

```text
Component
   │
   ▼
composables/useAuth.js  ──▶ api/auth.js  ──▶ http/axios.js ──▶ interceptors/tokenManager.js
composables/useTutorials.js ─▶ api/tutorials.js ─▶ http/axios.js
useDate.js  ──(independent utility)
```

In essence:

* **`http`**: plumbing
* **`api`**: endpoints
* **`composables`**: Vue-facing logic
* **`utils`**: supporting constants
* **`index.js`**: one import to rule them all

---