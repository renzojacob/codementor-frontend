import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Tutorials from './pages/Tutorials.vue';
import Challenge from './pages/Challenge.vue';
import Leaderboard from './pages/Leaderboard.vue';
import Login from './pages/Login.vue';

const routes = [
  { path: '/', component: Home, meta: { layout: 'PublicLayout' } },
  { path: '/login', component: Login, meta: { layout: 'PublicLayout' } },
  { path: '/tutorials', component: Tutorials, meta: { layout: 'PublicLayout' } },
  { path: '/challenge/:id', component: Challenge, meta: { layout: 'ChallengeLayout' } },
  { path: '/leaderboard', component: Leaderboard, meta: { layout: 'PublicLayout' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global layout wrapper
router.beforeEach((to, from, next) => {
  const layout = to.meta.layout || 'PublicLayout';
  to.meta.layoutName = layout;
  next();
});

export default router;
