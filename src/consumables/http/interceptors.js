import { getAccessToken, getRefreshToken, refreshToken, clearTokens } from './tokenManager'

export const setupInterceptors = (axiosInstance) => {
  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      // Add auth token if available
      const token = getAccessToken()
      if (token && !config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      // Handle token refresh on 401
      if (error.response?.status === 401 && 
          getRefreshToken() && 
          !originalRequest._retry &&
          !originalRequest.url.includes('/refresh') &&
          !originalRequest.url.includes('/logout')) {
        
        originalRequest._retry = true

        try {
          const success = await refreshToken()
          if (success) {
            // Retry the original request with new token
            const newToken = getAccessToken()
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`
            return axiosInstance(originalRequest)
          }
        } catch {
          // Refresh failed, clear tokens
          clearTokens()
          window.location.href = '/login'
        }
      }

      return Promise.reject(error)
    }
  )
}