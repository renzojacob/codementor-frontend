// src/app/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Import route arrays from feature modules
import adminRoutes from '@/features/admin/routes'
import learnRoutes from '@/features/learn/routes'
import publicRoutes from '@/features/public/routes'
import authRoutes from '@/features/auth/routes'
import mainRoutes from '@/features/main/routes'

import { setupGuards } from './guards'


// Combine all routes into a single array and create the router
const router = createRouter({
  history: createWebHistory(),
  routes: [
  ...adminRoutes, 
  ...learnRoutes, 
  ...publicRoutes, 
  ...authRoutes, 
  ...mainRoutes],
})

// Register guards
setupGuards(router)
export default router