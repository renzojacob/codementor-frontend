import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Tutorials from './pages/Tutorials.vue';
import Challenge from './pages/Challenge.vue';
import Leaderboard from './pages/Leaderboard.vue';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue'; // 👈 add this
import VerifyEmail from './pages/VerifyEmail.vue';

const routes = [
  { path: '/', component: Home, meta: { layout: 'PublicLayout' } },
  { path: '/login', component: Login, meta: { layout: 'PublicLayout', guestOnly: true } }, // 👈 guestOnly for logged-out users
  { path: '/register', component: Register, meta: { layout: 'PublicLayout', guestOnly: true } }, // 👈 new route
  { path: '/tutorials', component: Tutorials, meta: { layout: 'PublicLayout' } },
  { path: '/challenge/:id', component: Challenge, meta: { layout: 'ChallengeLayout' } },
  { path: '/leaderboard', component: Leaderboard, meta: { layout: 'PublicLayout' } },
  { path: '/verify-email', component: VerifyEmail, meta: { layout: 'PublicLayout' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// --- Global layout wrapper ---
router.beforeEach((to, from, next) => {
  const layout = to.meta.layout || 'PublicLayout';
  to.meta.layoutName = layout;

  // Optional guard: prevent logged-in users from revisiting /login or /register
  // const isAuthenticated = !!localStorage.getItem('access_token');
  //if (to.meta.guestOnly && isAuthenticated) {
  //  return next('/');
  //}

  next();
});

export default router;
