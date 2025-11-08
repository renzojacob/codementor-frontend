import { axiosInstance } from '../http/axios'

export const learnAPI = {
  // Languages
  languages: {
    getAll: () => axiosInstance.get('/languages'),
    get: (id) => axiosInstance.get(`/languages/${id}`),
    create: (data) => axiosInstance.post('/languages', data),
    update: (id, data) => axiosInstance.put(`/languages/${id}`, data),
    delete: (id) => axiosInstance.delete(`/languages/${id}`),
  },
  
  // Lessons
  lessons: {
    getByLanguage: (langSlug) => axiosInstance.get(`/languages/${langSlug}/lessons`),
    get: (id) => axiosInstance.get(`/lessons/${id}`),
    create: (data) => axiosInstance.post('/lessons', data),
    update: (id, data) => axiosInstance.put(`/lessons/${id}`, data),
    delete: (id) => axiosInstance.delete(`/lessons/${id}`),
  },
  
  // Tutorials (if you have separate tutorials endpoint)
  tutorials: {
    getAll: (params = {}) => axiosInstance.get('/tutorials', { params }),
    get: (id) => axiosInstance.get(`/tutorials/${id}`),
    create: (data) => axiosInstance.post('/tutorials', data),
    update: (id, data) => axiosInstance.put(`/tutorials/${id}`, data),
    delete: (id) => axiosInstance.delete(`/tutorials/${id}`),
    search: (query) => axiosInstance.get(`/tutorials/search?q=${query}`),
  }
}