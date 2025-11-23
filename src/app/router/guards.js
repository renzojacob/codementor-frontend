// src/app/router/guards.js
import { useUserStore } from '@/core/store/user' // or wherever your auth state lives

export function setupGuards(router) {
  router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    const isAuthenticated = !!userStore.token // or userStore.isLoggedIn

    const requiresAuth = to.meta.requiresAuth
    const guestOnly = to.meta.guestOnly

    const routeExists = router.hasRoute(to.name || '');

    const title = to.meta.title 
    ? `${to.meta.title} | CodeMentor` 
    : 'Spehere | CodeMentor';

    // 1️⃣ If route requires login but user is not authenticated
    if (requiresAuth && !isAuthenticated) {
      return next({ name: 'Login' })
    }

    // 2️⃣ If route is guest-only but user is already logged in
    if (guestOnly && isAuthenticated) {
      return next({ name: 'Dashboard' }) // or wherever you want logged users to go
    }

    document.title = title;


    if (!routeExists) {
      next({ name: 'NotFound' }); // or { path: '/404' }
    } 

    // 3️⃣ Otherwise, proceed normally
    next()
  })
}
