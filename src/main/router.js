import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import Challenge from './pages/Challenge.vue'
import Leaderboard from './pages/Leaderboard.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import VerifyEmail from './pages/VerifyEmail.vue'

import LearnHome from './pages/learn/LearnHome.vue'
import LearnLayout from './pages/learn/LearnLayout.vue'
import TryItEditor from './pages/learn/TryItEditor.vue'

// --- Route definitions ---
const routes = [
  // Public main routes
  { path: '/', component: Home, meta: { layout: 'PublicLayout' } },
  { path: '/login', component: Login, meta: { layout: 'PublicLayout', guestOnly: true } },
  { path: '/register', component: Register, meta: { layout: 'PublicLayout', guestOnly: true } },
  { path: '/verify-email', component: VerifyEmail, meta: { layout: 'PublicLayout' } },

  // Authenticated pages
  { path: '/leaderboard', component: Leaderboard, meta: { layout: 'AuthLayout', requiresAuth: true } },
  { path: '/challenge/:id', component: Challenge, meta: { layout: 'ChallengeLayout', requiresAuth: true } },

  // Learn Section (public)
  {
    path: '/learn',
    component: LearnHome,
    meta: { layout: 'PublicLayout' }
  },
  {
    path: '/learn/:lang',
    component: LearnLayout,
    meta: { layout: 'PublicLayout' },
    children: [
      {
        path: '',
        redirect: to => `/learn/${to.params.lang}/intro`
      },
      {
        path: 'try',
        component: TryItEditor,
        meta: { layout: 'PublicLayout' }
      },
      {
        path: ':topic',
        component: () => import('./pages/learn/LearnDynamic.vue'),
        meta: { layout: 'PublicLayout' }
      }
    ]
  },

  // 404 fallback
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

// --- Router setup ---
const router = createRouter({
  history: createWebHistory(),
  routes
})

// --- Global route guard ---
router.beforeEach((to, from, next) => {
  const layout = to.meta.layout || 'PublicLayout'
  to.meta.layoutName = layout

  const isAuthenticated = !!localStorage.getItem('access_token') // your auth logic

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/login') // redirect unauthenticated users
  }

  if (to.meta.guestOnly && isAuthenticated) {
    return next('/') // redirect logged-in users from guest pages
  }

  next()
})

export default router
