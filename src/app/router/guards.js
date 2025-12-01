import { useUserStore } from '@/core/store/user'

// Simple auth guard without complex initialization
export const authGuard = async (to, from, next) => {
  // Wait for next tick to ensure Pinia is ready
  await new Promise(resolve => setTimeout(resolve, 0))
  
  const userStore = useUserStore()
  
  // Simple check - if we have a token in localStorage
  const hasToken = !!localStorage.getItem('access_token')
  
  console.log('Auth guard check:', {
    path: to.path,
    requiresAuth: to.meta.requiresAuth,
    requiresGuest: to.meta.requiresGuest,
    requiresAdmin: to.meta.requiresAdmin,
    hasToken,
    userRole: userStore.role,
    userInitialized: userStore.isInitialized
  })

  // For routes that require authentication
  if (to.meta.requiresAuth && !hasToken) {
    console.log('Redirecting to login - requires auth but no token')
    next({ 
      path: '/login', 
      query: { redirect: to.fullPath } 
    })
    return
  }
  
  // For guest-only routes (like login) when user is logged in
  if (to.meta.requiresGuest && hasToken) {
    console.log('Redirecting from guest route - user is logged in')
    // Redirect to appropriate dashboard based on role
    if (userStore.isAdmin) {
      next('/admin')
    } else {
      next('/app')
    }
    return
  }
  
  // Admin routes protection
  if (to.meta.requiresAdmin && (!userStore.isAdmin || !hasToken)) {
    console.log('Redirecting to unauthorized - requires admin')
    next('/unauthorized')
    return
  }
  
  // User app routes protection for admins
  if (to.meta.requiresUser && userStore.isAdmin) {
    console.log('Redirecting to admin - user is admin but route requires user')
    next('/admin')
    return
  }
  
  console.log('Auth guard - all checks passed, proceeding to route')
  // All checks passed
  next()
}

// Export both functions explicitly
export default {
  authGuard
}