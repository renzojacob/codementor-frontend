import { axiosInstance } from '../http/axios'

export const adminAPI = {
  stats: {
    get: () => axiosInstance.get('/admin/stats'),
    userGrowth: (months = 6) => axiosInstance.get(`/admin/user-growth?months=${months}`),
    lessonEngagement: (limit = 10) => axiosInstance.get(`/admin/lesson-engagement?limit=${limit}`),
    recentActivity: (limit = 10) => axiosInstance.get(`/admin/recent-activity?limit=${limit}`),
  },

  users: {
    list: (page = 1, limit = 20) => axiosInstance.get(`/admin/users?page=${page}&limit=${limit}`),
    get: (userId) => axiosInstance.get(`/admin/users/${userId}`),
    update: (userId, data) => axiosInstance.put(`/admin/users/${userId}`, data),
    delete: (userId) => axiosInstance.delete(`/admin/users/${userId}`),
  }
}