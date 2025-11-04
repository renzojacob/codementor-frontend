// src/main/router.js
import { createRouter, createWebHistory } from 'vue-router'

// --- Lazy-loaded page imports (improves performance) ---
const Home = () => import('./pages/Home.vue')
const Challenge = () => import('./pages/Challenge.vue')
const Leaderboard = () => import('./pages/Leaderboard.vue')
const Login = () => import('./pages/Login.vue')
const Register = () => import('./pages/Register.vue')
const VerifyEmail = () => import('./pages/VerifyEmail.vue')

// Learn section
const LearnHome = () => import('./pages/learn/LearnHome.vue')
const LearnLayout = () => import('./pages/learn/LearnLayout.vue')
const TryItEditor = () => import('./pages/learn/TryItEditor.vue')
const LearnDynamic = () => import('./pages/learn/LearnDynamic.vue')

// --- Route definitions ---
const routes = [
  // Public routes
  { path: '/', component: Home, meta: { layout: 'PublicLayout' } },
  { path: '/login', component: Login, meta: { layout: 'PublicLayout', guestOnly: true } },
  { path: '/register', component: Register, meta: { layout: 'PublicLayout', guestOnly: true } },
  { path: '/verify-email', component: VerifyEmail, meta: { layout: 'PublicLayout' } },

  // Authenticated routes
  {
    path: '/leaderboard',
    component: Leaderboard,
    meta: { layout: 'AuthLayout', requiresAuth: true },
  },
  {
    path: '/challenge/:id',
    component: Challenge,
    meta: { layout: 'ChallengeLayout', requiresAuth: true },
  },

  // --- Learn Section (public) ---
  {
    path: '/learn',
    name: 'LearnHome',
    component: LearnHome,
    meta: { layout: 'PublicLayout' },
  },
  {
    path: '/learn/:lang',
    component: LearnLayout,
    meta: { layout: 'PublicLayout' },
    children: [
      {
        path: '',
        redirect: (to) => `/learn/${to.params.lang}/intro`, // Default redirect to intro topic
      },
      {
        path: 'try',
        name: 'TryItEditor',
        component: TryItEditor,
        meta: { layout: 'PublicLayout' },
      },
      {
        path: ':topic',
        name: 'LearnDynamic',
        component: LearnDynamic,
        meta: { layout: 'PublicLayout' },
      },
    ],
  },

  // 404 fallback
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

// --- Router setup ---
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// --- Global route guard ---
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('access_token')
  const layout = to.meta.layout || 'PublicLayout'
  to.meta.layoutName = layout

  // Auth guard
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ path: '/login', query: { redirect: to.fullPath } })
  }

  // Guest-only guard
  if (to.meta.guestOnly && isAuthenticated) {
    return next('/')
  }

  next()
})

export default router
