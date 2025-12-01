// src/app/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './guards' // Make sure this import matches
import publicRoutes  from '@/features/public/routes'
import authRoutes  from '@/features/auth/routes'
import mainRoutes  from '@/features/main/routes'
import learnRoutes  from '@/features/learn/routes'
import adminRoutes  from '@/features/admin/routes'

const routes = [
  ...publicRoutes,
  ...authRoutes,
  ...mainRoutes,
  ...learnRoutes,
  ...adminRoutes,
  // Unauthorized route
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: () => import('@/features/public/pages/Unauthorized.vue'),
    meta: { title: 'Access Denied' }
  },
  // 404 fallback
    { 
    path: '/:pathMatch(.*)*', 
    name: 'not-found',
    component: () => import('@/features/public/pages/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Add auth guard
router.beforeEach(authGuard)

export default router