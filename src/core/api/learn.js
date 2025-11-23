import { axiosInstance } from '../http/axios'

export const learnAPI = {
  // Admin Languages Management
  admin: {
    languages: {
      getAll: (params = {}) => axiosInstance.get('/admin/learn/languages', { params }),
      create: (data) => axiosInstance.post('/admin/learn/languages', data),
      update: (id, data) => axiosInstance.put(`/admin/learn/languages/${id}`, data),
      delete: (id) => axiosInstance.delete(`/admin/learn/languages/${id}`),
    },
    
    lessons: {
      getAll: (params = {}) => axiosInstance.get('/admin/learn/lessons', { params }),
      get: (id) => axiosInstance.get(`/admin/learn/lessons/${id}`),
      create: (data) => axiosInstance.post('/admin/learn/lessons', data),
      update: (id, data) => axiosInstance.put(`/admin/learn/lessons/${id}`, data),
      delete: (id) => axiosInstance.delete(`/admin/learn/lessons/${id}`),
    },
    
    sections: {
      getAll: (params = {}) => axiosInstance.get('/admin/learn/sections', { params }),
      create: (data) => axiosInstance.post('/admin/learn/sections', data),
      update: (id, data) => axiosInstance.put(`/admin/learn/sections/${id}`, data),
      delete: (id) => axiosInstance.delete(`/admin/learn/sections/${id}`),
    },
    
    analytics: {
      getOverview: () => axiosInstance.get('/admin/learn/analytics/overview'),
    },
    
    export: {
      content: (type) => axiosInstance.get(`/admin/learn/export/${type}`),
    },
    
    reorder: {
      sections: (lessonId, data) => axiosInstance.post(`/admin/learn/lessons/${lessonId}/reorder-sections`, data),
    }
  },
  
  // Public endpoints (keep your existing ones)
  languages: {
    getAll: () => axiosInstance.get('/languages'),
    get: (id) => axiosInstance.get(`/languages/${id}`),
  },
  
  lessons: {
    getByLanguage: (langSlug) => axiosInstance.get(`/languages/${langSlug}/lessons`),
    get: (id) => axiosInstance.get(`/lessons/${id}`),
  },
  
}