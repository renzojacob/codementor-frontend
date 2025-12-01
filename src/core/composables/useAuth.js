import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authAPI } from '@/core/api/auth'
import { useUserStore } from '@/core/store/user'

export const useAuth = () => {
  const router = useRouter()
  const userStore = useUserStore()
  const isLoading = ref(false)
  const error = ref(null)

  const handleApiError = (err) => {
    if (err.code === 'NETWORK_ERROR' || err.message.includes('Network Error')) {
      return 'Cannot connect to server. Please check your internet connection and try again.'
    }

    if (err.response?.data?.message) {
      return err.response.data.message
    }

    if (err.response?.data?.error) {
      return err.response.data.error
    }

    return 'An unexpected error occurred. Please try again.'
  }

  const login = async (username, password) => {
    isLoading.value = true
    error.value = null

    try {
      console.log('Making login request...')
      const response = await authAPI.login(username, password)
      console.log('Login API response:', response)

      if (response.access_token) {
        // Store tokens
        localStorage.setItem('access_token', response.access_token)

        if (response.refresh_token) {
          localStorage.setItem('refresh_token', response.refresh_token)
        }

        // Extract user data from the response
        const userData = response.user

        console.log('Extracted user data:', userData)

        if (!userData) {
          throw new Error('No user data received from server')
        }

        // Update user store with the actual data from your API
        userStore.login({
          id: userData.id,
          username: userData.username,
          email: userData.email,
          token: response.access_token,
          role: userData.role
        })

        console.log('User store after update:', {
          id: userStore.id,
          username: userStore.username,
          email: userStore.email,
          role: userStore.role,
          isAdmin: userStore.isAdmin
        })

        return { success: true, user: userStore }
      } else {
        throw new Error('No access token received from server')
      }
    } catch (err) {
      const errorMessage = handleApiError(err)
      error.value = errorMessage
      console.error('Login failed:', err)
      return { success: false, error: errorMessage }
    } finally {
      isLoading.value = false
    }
  }

  const register = async (userData) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await authAPI.register(userData)

      // Different frameworks return different responses
      if (response.message || response.user || response.success) {
        // Optionally auto-login after registration or redirect to login
        await router.push({
          path: '/login',
          query: { registered: 'true', email: userData.email }
        })

        return {
          success: true,
          message: response.message || 'Registration successful'
        }
      } else {
        throw new Error('Unexpected response format')
      }
    } catch (err) {
      error.value = err.response?.data?.message ||
        err.response?.data?.error ||
        'Registration failed'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const logout = async (silent = false) => {
    try {
      await authAPI.logout()
    } catch (err) {
      console.warn('Logout API call failed:', err.message)
    } finally {
      // Clear local storage
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')

      // Clear user store
      userStore.logout()

      if (!silent) {
        // Redirect to login
        await router.push('/login')
      }
    }
  }

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token')

    if (!refreshToken) {
      throw new Error('No refresh token available')
    }

    try {
      const response = await authAPI.refreshToken()

      if (response.access_token) {
        localStorage.setItem('access_token', response.access_token)

        // Update token in store
        userStore.token = response.access_token

        return response
      } else {
        throw new Error('No access token in refresh response')
      }
    } catch (err) {
      console.error('Token refresh failed:', err)
      // Clear tokens and logout on refresh failure
      await logout(true)
      throw err
    }
  }

  const getCurrentUser = async () => {
    try {
      console.log('Fetching current user data...')
      const response = await authAPI.getCurrentUser()
      console.log('Current user API response:', response)

      // Your API should return the user object directly or nested
      const userData = response.data || response.user || response

      console.log('Extracted current user data:', userData)

      if (!userData || !userData.id) {
        throw new Error('Invalid user data received')
      }

      // Update user store
      userStore.login({
        id: userData.id,
        username: userData.username,
        email: userData.email,
        token: localStorage.getItem('access_token'),
        role: userData.role
      })

      console.log('User store updated with current user:', {
        id: userStore.id,
        username: userStore.username,
        email: userStore.email,
        role: userStore.role
      })

      return userData
    } catch (err) {
      console.error('Failed to fetch current user:', err)
      throw err
    }
  }

  const fetchCurrentUser = async () => {
    try {
      console.log('Fetching current user data via fetchCurrentUser...')
      const response = await authAPI.getCurrentUser()
      console.log('fetchCurrentUser API response:', response)

      // Extract user data - handle different response formats
      const userData = response.data || response.user || response

      console.log('Extracted user data for fetch:', userData)

      if (!userData || !userData.id) {
        throw new Error('Invalid user data received from getCurrentUser endpoint')
      }

      // Update user store
      userStore.login({
        id: userData.id,
        username: userData.username,
        email: userData.email,
        token: localStorage.getItem('access_token'),
        role: userData.role
      })

      console.log('User store after fetchCurrentUser:', {
        id: userStore.id,
        username: userStore.username,
        email: userStore.email,
        role: userStore.role
      })

      return userData
    } catch (err) {
      console.error('Failed to fetch current user:', err)
      throw err
    }
  }
  // Check if user is authenticated (has valid token)
  const checkAuth = () => {
    const token = localStorage.getItem('access_token')
    return !!token && !isTokenExpired(token)
  }

  // Simple token expiration check (JWT)
  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.exp < Date.now() / 1000
    } catch {
      return true
    }
  }

  // OAuth methods
  const initiateOAuth = async (provider) => {
    try {
      let url
      if (provider === 'github') {
        const response = await authAPI.getGithubAuthUrl()
        url = response.url || response.auth_url
      } else if (provider === 'google') {
        const response = await authAPI.getGoogleAuthUrl()
        url = response.url || response.auth_url
      } else {
        throw new Error(`Unsupported provider: ${provider}`)
      }

      // Redirect to OAuth provider
      window.location.href = url
    } catch (err) {
      error.value = err.response?.data?.message || `Failed to initiate ${provider} login`
      throw err
    }
  }

  return {
    isLoading,
    error,
    login,
    register,
    logout,
    refreshToken,
    getCurrentUser,
    fetchCurrentUser,
    checkAuth,
    initiateOAuth
  }
}