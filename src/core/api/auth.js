import { axiosInstance } from '../http/axios'

export const authAPI = {
  login: async (username, password) => {
    const response = await axiosInstance.post('/login', { username, password })
    return response.data
  },

  logout: async () => {
    const refresh_token = localStorage.getItem('refresh_token')
    
    if (refresh_token) {
      try {
        await axiosInstance.post('/logout', { refresh_token })
      } catch (error) {
        console.warn('Logout API call failed:', error.message)
      }
    }
  },

  register: async (userData) => {
    const response = await axiosInstance.post('/register', userData)
    return response.data
  },

  refreshToken: async () => {
    const refresh_token = localStorage.getItem('refresh_token')
    const response = await axiosInstance.post('/refresh', { refresh_token })
    return response.data
  }
}