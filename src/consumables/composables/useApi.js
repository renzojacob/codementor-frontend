import { ref } from 'vue'
import { axiosInstance } from '../http/axios'
import { authAPI, adminAPI, tutorialsAPI } from '../api'

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
        getAll: () => execute(tutorialsAPI.languages.getAll),
        get: (id) => execute(tutorialsAPI.languages.get, id),
        create: (data) => execute(tutorialsAPI.languages.create, data),
        update: (id, data) => execute(tutorialsAPI.languages.update, id, data),
        delete: (id) => execute(tutorialsAPI.languages.delete, id),
      },
      
      // Lessons
      lessons: {
        getByLanguage: (langSlug) => execute(tutorialsAPI.lessons.getByLanguage, langSlug),
        get: (id) => execute(tutorialsAPI.lessons.get, id),
        create: (data) => execute(tutorialsAPI.lessons.create, data),
        update: (id, data) => execute(tutorialsAPI.lessons.update, id, data),
        delete: (id) => execute(tutorialsAPI.lessons.delete, id),
      },
      
      // Tutorials
      getAll: (params) => execute(tutorialsAPI.tutorials.getAll, params),
      get: (id) => execute(tutorialsAPI.tutorials.get, id),
      create: (data) => execute(tutorialsAPI.tutorials.create, data),
      update: (id, data) => execute(tutorialsAPI.tutorials.update, id, data),
      delete: (id) => execute(tutorialsAPI.tutorials.delete, id),
      search: (query) => execute(tutorialsAPI.tutorials.search, query),
    }
  }
}