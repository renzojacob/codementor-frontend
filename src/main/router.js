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

// Layout components
const BlankLayout = () => import('./layouts/BlankLayout.vue')
const AuthLayout = () => import('./layouts/AuthLayout.vue')
const PublicLayout = () => import('./layouts/PublicLayout.vue')
const ChallengeLayout = () => import('./layouts/ChallengeLayout.vue')
const AppLayout = () => import('./layouts/AppLayout.vue')

// --- Route definitions ---
const routes = [
  // Public routes (Marketing site)
  {
    path: '/',
    component: Home,
    meta: { layout: 'PublicLayout' }
  },

  // Auth routes (Authentication flow)
  {
    path: '/login',
    component: Login,
    meta: { layout: 'AuthLayout', guestOnly: true }
  },
  {
    path: '/register',
    component: Register,
    meta: { layout: 'AuthLayout', guestOnly: true }
  },
  {
    path: '/verify-email',
    component: VerifyEmail,
    meta: { layout: 'AuthLayout' }
  },

  // Learn Section (Public educational content)
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

  // Authenticated routes (App functionality)

  // Update these routes:
  {
    path: '/leaderboard',
    component: Leaderboard,
    meta: { layout: 'AppLayout', requiresAuth: true },
  },
  {
    path: '/challenge/:id',
    component: Challenge,
    meta: { layout: 'AppLayout', requiresAuth: true },
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

// --- Layout component mapping ---
const layoutComponents = {
  BlankLayout,
  AuthLayout,
  PublicLayout,
  ChallengeLayout,
  AppLayout,
}

// --- Global route guard ---
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('access_token')

  // Set default layout if not specified
  const layout = to.meta.layout || 'PublicLayout'
  to.meta.layoutComponent = layoutComponents[layout]

  // Auth guard
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({
      path: '/login',
      query: { redirect: to.fullPath },
      meta: { layout: 'AuthLayout' }
    })
  }

  // Guest-only guard (redirect authenticated users away from auth pages)
  if (to.meta.guestOnly && isAuthenticated) {
    return next('/')
  }

  next()
})

export default router