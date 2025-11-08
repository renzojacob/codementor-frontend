// src/core/http/interceptors.js
export const setupInterceptors = (axiosInstance) => {
  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      // Add auth token if available
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
        !originalRequest._retry &&
        !originalRequest.url.includes('/refresh') &&
        !originalRequest.url.includes('/logout')) {

        originalRequest._retry = true

        // Retry the original request with new token

        // Refresh failed, clear tokens

      }

      return Promise.reject(error)
    }
  )
}