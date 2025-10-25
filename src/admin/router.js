// src/admin/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from './pages/Dashboard.vue';
import Users from './pages/Users.vue';
import Content from './pages/Content.vue';
import Analytics from './pages/Analytics.vue';
import { useUserStore } from '../store/user';

const routes = [
  { path: '/admin', component: Dashboard, meta: { layout: 'AdminLayout', requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/users', component: Users, meta: { layout: 'AdminLayout', requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/content', component: Content, meta: { layout: 'AdminLayout', requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/analytics', component: Analytics, meta: { layout: 'AdminLayout', requiresAuth: true, requiresAdmin: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const user = useUserStore();

  // Require login
  if (to.meta.requiresAuth && !user.isLoggedIn) {
    return next('/login');
  }

  // Require admin privileges
  if (to.meta.requiresAdmin && !user.isAdmin) {
    return next('/');
  }

  next();
});

export default router;
