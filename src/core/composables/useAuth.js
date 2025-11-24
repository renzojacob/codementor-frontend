// src/core/composables/useAuth.js
import { ref } from 'vue'
import { useUserStore } from '@/core/store/user'
import { authAPI } from '@/core/api/auth'

export const useAuth = () => {
  const loading = ref(false)
  const error = ref(null)
  const userStore = useUserStore()

  // ======== Existing methods (unchanged) ========
  const register = async (userData) => {
    loading.value = true
    error.value = null

    try {
      const response = await authAPI.register(userData)

      if (response.access_token) {
        await saveUserData(response, userData)
      }

      return response
    } catch (err) {
      error.value = err.response?.data?.error || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const login = async (username, password) => {
    loading.value = true
    error.value = null

    try {
      const response = await authAPI.login(username, password)

      let userData, tokens

      if (response.tokens && response.user) {
        tokens = response.tokens
        userData = response.user
      } else if (response.access_token) {
        tokens = {
          access_token: response.access_token,
          refresh_token: response.refresh_token
        }
        userData = response.user
      } else {
        throw new Error('Invalid response format from server')
      }

      userStore.login({
        id: userData.id,
        username: userData.username,
        email: userData.email,
        token: tokens.access_token,
        role: userData.role || 'user'
      })

      localStorage.setItem('access_token', tokens.access_token)
      return response
    } catch (err) {
      error.value = err.response?.data?.error || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    error.value = null

    try {
      await authAPI.logout()
    } catch (err) {
      console.warn('Logout warning:', err.message)
    } finally {
      clearUserData()
      loading.value = false
    }
  }

  const saveUserData = async (response, userData) => {
    const userInfo = {
      id: response.user?.id,
      username: response.user?.username || userData.username,
      email: response.user?.email || userData.email,
      token: response.access_token,
      role: response.user?.role || 'user'
    }

    userStore.login(userInfo)
    localStorage.setItem('user', JSON.stringify(userInfo))
    localStorage.setItem('access_token', response.access_token)
  }

  const clearUserData = () => {
    userStore.logout()
    localStorage.removeItem('user')
    localStorage.removeItem('access_token')
    // Clear cookies manually (optional, backend should handle via Set-Cookie with Max-Age=0)
  }

  const checkAuth = async () => {
    // Try to restore from localStorage first
    const token = localStorage.getItem('access_token')
    const userData = localStorage.getItem('user')

    if (token && userData) {
      try {
        const user = JSON.parse(userData)
        userStore.login({ ...user, token })
        return true
      } catch (err) {
        console.error('Failed to restore user session:', err)
        clearUserData()
      }
    }

    // If no token, try `/me` (for HTTP-only cookie flow)
    try {
      const { user } = await authAPI.getCurrentUser()
      if (user) {
        // Note: token is *not* exposed in response — we just know session is valid
        userStore.login({
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          token: 'http-only' // placeholder — real token stays in cookie
        })
        return true
      }
    } catch (e) {
      // silent fail — no session
    }

    return false
  }

  // ======== NEW: OAuth Methods ========
  const loginWithGoogle = async () => {
    try {
      const { auth_url } = await authAPI.getGoogleAuthUrl()
      window.location.href = auth_url
    } catch (err) {
      error.value = err.response?.data?.error || 'Failed to start Google login'
      throw err
    }
  }

  const loginWithGithub = async () => {
    try {
      const { auth_url } = await authAPI.getGithubAuthUrl()
      window.location.href = auth_url
    } catch (err) {
      error.value = err.response?.data?.error || 'Failed to start GitHub login'
      throw err
    }
  }

  // Call this on `/auth/callback` route mount
  const handleOAuthCallback = async () => {
    loading.value = true
    error.value = null

    try {
      // After redirect, backend sets tokens in HTTP-only cookies.
      // Now fetch user to confirm login & hydrate frontend.
      const { user } = await authAPI.getCurrentUser()

      if (!user) throw new Error('Authentication failed')

      // Sync user store (token stays hidden in cookies)
      userStore.login({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: 'http-only'
      })

      // Redirect to dashboard/app
      return { success: true, user }
    } catch (err) {
      error.value = 'OAuth login failed. Please try again.'
      clearUserData()
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    register,
    login,
    logout,
    checkAuth,
    loginWithGoogle,
    loginWithGithub,
    handleOAuthCallback,
    isAuthenticated: () => !!userStore.token && userStore.token !== 'http-only' ? true : !!userStore.id,
    isAdmin: () => userStore.isAdmin,
    getCurrentUser: () => ({
      id: userStore.id,
      username: userStore.username,
      email: userStore.email,
      role: userStore.role,
      lastLogin: userStore.formattedLastLogin
    })
  }
}

// Optional: keep singleton helpers (now updated)
export const auth = {
  login: (username, password) => useAuth().login(username, password),
  logout: () => useAuth().logout(),
  register: (userData) => useAuth().register(userData),
  checkAuth: () => useAuth().checkAuth(),
  loginWithGoogle: () => useAuth().loginWithGoogle(),
  loginWithGithub: () => useAuth().loginWithGithub(),
  handleOAuthCallback: () => useAuth().handleOAuthCallback()
}