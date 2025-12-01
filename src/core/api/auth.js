import { axiosInstance } from '../http/axios'

export const authAPI = {
  login: async (username, password) => {
    const response = await axiosInstance.post('/auth/login', { username, password })
    return response.data
  },

  logout: async () => {
    const refreshToken = localStorage.getItem('refresh_token')
    if (refreshToken) {
      try {
        await axiosInstance.post('/auth/logout', { refresh_token: refreshToken })
      } catch (error) {
        console.warn('Logout API call failed:', error.message)
      }
    }
  },

  register: async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData)
    return response.data
  },

  refreshToken: async () => {
    const refreshToken = localStorage.getItem('refresh_token')
    const response = await axiosInstance.post('/auth/refresh', { 
      refresh_token: refreshToken 
    })
    return response.data
  },

  getCurrentUser: async () => {
    const response = await axiosInstance.get('/auth/me')
    return response.data
  },

  // OAuth endpoints - adjust based on your framework's OAuth implementation
  getGithubAuthUrl: () => axiosInstance.get('/auth/github/url').then(res => res.data),
  getGoogleAuthUrl: () => axiosInstance.get('/auth/google/url').then(res => res.data),
  
  // Verify email (if your framework supports it)
  verifyEmail: (token) => axiosInstance.post('/auth/verify-email', { token }),
  
  // Password reset (if needed)
  forgotPassword: (email) => axiosInstance.post('/auth/forgot-password', { email }),
  resetPassword: (token, newPassword) => axiosInstance.post('/auth/reset-password', { 
    token, 
    password: newPassword 
  })
}