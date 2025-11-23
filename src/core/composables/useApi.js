// src/core/composables/useApi.js
import { ref } from 'vue'
import { axiosInstance } from '../http/axios'
// Note: learnAPI is still imported, but we'll remove its specific handlers below.
import { authAPI, adminAPI, learnAPI } from '../api' 

export const useApi = () => {
  const loading = ref(false)
  const error = ref(null)

  // This core function is what useApi provides: 
  // centralized error handling, loading state, and execution logic.
  const execute = async (apiCall, ...args) => {
    loading.value = true
    error.value = null
    
    try {
      // apiCall is expected to be a function that returns a Promise (like an axios call)
      const response = await apiCall(...args)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'An error occurred'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    loading,
    error,
    
    // Core method
    execute,
    
    // Convenience methods (The original axios methods wrapped with execute)
    // These are still useful for ad-hoc API calls not covered by specific API groups.
    get: (url, config) => execute(axiosInstance.get, url, config),
    post: (url, data, config) => execute(axiosInstance.post, url, data, config),
    put: (url, data, config) => execute(axiosInstance.put, url, data, config),
    delete: (url, config) => execute(axiosInstance.delete, url, config),
    
    // API groups (Only include groups that need useApi's logic, like auth/admin)
    auth: {
      login: (username, password) => execute(authAPI.login, username, password),
      logout: () => execute(authAPI.logout),
      register: (userData) => execute(authAPI.register, userData),
    },
    
    admin: {
      stats: {
        get: () => execute(adminAPI.stats.get),
        userGrowth: (months) => execute(adminAPI.stats.userGrowth, months),
        lessonEngagement: (limit) => execute(adminAPI.stats.lessonEngagement, limit),
        recentActivity: (limit) => execute(adminAPI.stats.recentActivity, limit),
      }
    },
    
    // *** REMOVED THE ENTIRE `learn` BLOCK HERE ***
  }
}