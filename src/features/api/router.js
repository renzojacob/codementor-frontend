// src/api/router.js
import { createRouter, createWebHistory } from 'vue-router';
import CodeEditor from './pages/CodeEditor.vue';
import Submissions from './pages/Submissions.vue';
import Progress from './pages/Progress.vue';
import { useUserStore } from '../store/user';

const routes = [
  { path: '/api/editor', component: CodeEditor, meta: { layout: 'ApiLayout', requiresAuth: true } },
  { path: '/api/submissions', component: Submissions, meta: { layout: 'ApiLayout', requiresAuth: true } },
  { path: '/api/progress', component: Progress, meta: { layout: 'ApiLayout', requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const user = useUserStore();

  if (to.meta.requiresAuth && !user.isLoggedIn) {
    return next('/login');
  }

  next();
});

export default router;
