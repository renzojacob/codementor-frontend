// src/core/api/analytics,js
import { axiosInstance } from '@/core/http/axios';

export const analyticsApi = {
  // Platform Overview
  getOverview() {
    return axiosInstance.get('/analytics/overview');
  },

  // User Growth
  getUserGrowth(range = '30d') {
    return axiosInstance.get(`/analytics/user-growth?range=${range}`);
  },

  // Submission Activity
  getSubmissionActivity(range = '30d') {
    return axiosInstance.get(`/analytics/submission-activity?range=${range}`);
  },

  // Learning Paths
  getLearningPaths() {
    return axiosInstance.get('/analytics/learning-paths');
  },

  // Challenge Difficulty
  getChallengeDifficulty() {
    return axiosInstance.get('/analytics/challenge-difficulty');
  },

  // Lesson Performance
  getLessonPerformance() {
    return axiosInstance.get('/analytics/lesson-performance');
  },

  // Session Stats
  getSessionStats() {
    return axiosInstance.get('/analytics/session-stats');
  },

  // Top Performers
  getTopPerformers(limit = 5) {
    return axiosInstance.get(`/analytics/top-performers?limit=${limit}`);
  },

  // Recent Activity
  getRecentActivity(limit = 5) {
    return axiosInstance.get(`/analytics/recent-activity?limit=${limit}`);
  },

  // User Stats
  getUserStats() {
    return axiosInstance.get('/analytics/user-stats');
  }
};