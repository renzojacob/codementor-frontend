// src/consumables/composables/useAuth.js
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
import { authAPI } from '../api'

export const useAuth = () => {
  const loading = ref(false)
  const error = ref(null)
  const userStore = useUserStore() // Move inside the function

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
      
      // Handle different response structures
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

      // Update user store
      userStore.login({
        id: userData.id,
        username: userData.username,
        email: userData.email,
        token: tokens.access_token,
        role: userData.role || 'user'
      })

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
  }

  const clearUserData = () => {
    userStore.logout()
    localStorage.removeItem('user')
  }

  const checkAuth = () => {
    const token = localStorage.getItem('access_token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData)
        userStore.login(user)
        return true
      } catch (err) {
        console.error('Failed to restore user session:', err)
        clearUserData()
      }
    }
    
    return false
  }

  return {
    loading,
    error,
    register,
    login,
    logout,
    checkAuth,
    isAuthenticated: () => !!userStore.token,
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

// Remove the singleton export or fix it like this:
export const auth = {
  // Don't call useAuth() here, instead create methods that call useAuth internally
  login: (username, password) => {
    const auth = useAuth()
    return auth.login(username, password)
  },
  logout: () => {
    const auth = useAuth()
    return auth.logout()
  },
  register: (userData) => {
    const auth = useAuth()
    return auth.register(userData)
  },
  checkAuth: () => {
    const auth = useAuth()
    return auth.checkAuth()
  }
}