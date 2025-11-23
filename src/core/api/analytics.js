// src/core/api/analytics,js
import { axiosInstance } from '@/core/http/axios';

export const analyticsApi = {
  // Platform Overview
  getOverview() {
    return axiosInstance.get('/admin/analytics/overview');
  },

  // User Growth
  getUserGrowth(range = '30d') {
    return axiosInstance.get(`/admin/analytics/user-growth?range=${range}`);
  },

  // Submission Activity
  getSubmissionActivity(range = '30d') {
    return axiosInstance.get(`/admin/analytics/submission-activity?range=${range}`);
  },

  // Learning Paths
  getLearningPaths() {
    return axiosInstance.get('/admin/analytics/learning-paths');
  },

  // Challenge Difficulty
  getChallengeDifficulty() {
    return axiosInstance.get('/admin/analytics/challenge-difficulty');
  },

  // Lesson Performance
  getLessonPerformance() {
    return axiosInstance.get('/admin/analytics/lesson-performance');
  },

  // Session Stats
  getSessionStats() {
    return axiosInstance.get('/admin/analytics/session-stats');
  },

  // Top Performers
  getTopPerformers(limit = 5) {
    return axiosInstance.get(`/admin/analytics/top-performers?limit=${limit}`);
  },

  // Recent Activity
  getRecentActivity(limit = 5) {
    return axiosInstance.get(`/admin/analytics/recent-activity?limit=${limit}`);
  },

  // User Stats
  getUserStats() {
    return axiosInstance.get('/admin/analytics/user-stats');
  }
};