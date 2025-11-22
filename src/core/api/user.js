// src/core/api/user.js (or auth.js as per your structure)
import { axiosInstance } from '@/core/http/axios';

export const userApi = {
  // Get users with filters
  getUsers(params) {
    return axiosInstance.get('/admin/users', { params });
  },

  // Get dashboard stats
  getStats() {
    return axiosInstance.get('/admin/users/stats');
  },

  // Get user details
  getUser(userId) {
    return axiosInstance.get(`/admin/users/${userId}`);
  },

  // Update user role
  updateUserRole(userId, role) {
    return axiosInstance.put(`/admin/users/${userId}/role`, { role_id: role });
  },

  // Moderate user account
  moderateUser(userId, data) {
    return axiosInstance.post(`/admin/users/${userId}/moderate`, data);
  },

  // Get user progress
  getUserProgress(userId) {
    return axiosInstance.get(`/admin/users/${userId}/progress`);
  },

  // Get user learning paths
  getUserLearningPaths(userId) {
    return axiosInstance.get(`/admin/users/${userId}/learning-paths`);
  },

  // Get user submissions
  getUserSubmissions(userId, params = {}) {
    return axiosInstance.get(`/admin/users/${userId}/submissions`, { params });
  },

  // Get user AI interactions
  getUserAiInteractions(userId, params = {}) {
    return axiosInstance.get(`/admin/users/${userId}/ai-interactions`, { params });
  }
};