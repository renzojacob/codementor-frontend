import { useAuth } from '@/core/composables/useAuth'

export const setupInterceptors = (axiosInstance) => {
  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('access_token')
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      
      console.log('Making API request:', config.method?.toUpperCase(), config.url)
      return config
    },
    (error) => {
      console.error('Request interceptor error:', error)
      return Promise.reject(error)
    }
  )

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      console.log('API response success:', response.status, response.config.url)
      return response
    },
    async (error) => {
      console.error('API response error:', {
        url: error.config?.url,
        status: error.response?.status,
        message: error.message,
        code: error.code
      })

      // Handle network errors (CORS, etc.)
      if (!error.response) {
        console.error('Network error - possible CORS issue:', error.message)
        // You might want to show a user-friendly message here
        throw new Error('Network error: Cannot connect to server. Please check your connection and try again.')
      }

      const originalRequest = error.config

      // Handle token refresh on 401
      if (error.response?.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url.includes('/auth/refresh') &&
        !originalRequest.url.includes('/auth/login') &&
        !originalRequest.url.includes('/auth/logout')) {

        originalRequest._retry = true

        try {
          const { refreshToken } = useAuth()
          const newTokens = await refreshToken()
          
          if (newTokens && newTokens.access_token) {
            originalRequest.headers.Authorization = `Bearer ${newTokens.access_token}`
            return axiosInstance(originalRequest)
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError)
          const { logout } = useAuth()
          await logout()
        }
      }

      return Promise.reject(error)
    }
  )
}