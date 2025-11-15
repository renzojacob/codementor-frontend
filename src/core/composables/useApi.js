import { ref } from 'vue'
import { axiosInstance } from '../http/axios'
import { authAPI, adminAPI, learnAPI } from '../api'

export const useApi = () => {
  const loading = ref(false)
  const error = ref(null)

  const execute = async (apiCall, ...args) => {
    loading.value = true
    error.value = null
    
    try {
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
    
    // Convenience methods
    get: (url, config) => execute(axiosInstance.get, url, config),
    post: (url, data, config) => execute(axiosInstance.post, url, data, config),
    put: (url, data, config) => execute(axiosInstance.put, url, data, config),
    delete: (url, config) => execute(axiosInstance.delete, url, config),
    
    // API groups
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
    
    tutorials: {
      // Languages
      languages: {
        getAll: () => execute(learnAPI.languages.getAll),
        get: (id) => execute(learnAPI.languages.get, id),
        create: (data) => execute(learnAPI.languages.create, data),
        update: (id, data) => execute(learnAPI.languages.update, id, data),
        delete: (id) => execute(learnAPI.languages.delete, id),
      },
      
      // Lessons
      lessons: {
        getByLanguage: (langSlug) => execute(learnAPI.lessons.getByLanguage, langSlug),
        get: (id) => execute(learnAPI.lessons.get, id),
        create: (data) => execute(learnAPI.lessons.create, data),
        update: (id, data) => execute(learnAPI.lessons.update, id, data),
        delete: (id) => execute(learnAPI.lessons.delete, id),
      },
      
      // Tutorials
      getAll: (params) => execute(learnAPI.tutorials.getAll, params),
      get: (id) => execute(learnAPI.tutorials.get, id),
      create: (data) => execute(learnAPI.tutorials.create, data),
      update: (id, data) => execute(learnAPI.tutorials.update, id, data),
      delete: (id) => execute(learnAPI.tutorials.delete, id),
      search: (query) => execute(learnAPI.tutorials.search, query),
    }
  }
}