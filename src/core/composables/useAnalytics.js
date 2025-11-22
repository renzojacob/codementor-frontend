// src/core/composables/useAnalytics.js
import { ref } from 'vue';
import { analyticsApi } from '@/core/api';

export function useAnalytics() {
  const loading = ref(false);
  const error = ref(null);

  const platformOverview = ref({});
  const userGrowthData = ref([]); // This should be an array for timeline data
  const userGrowthStats = ref({});
  const submissionActivity = ref({});
  const learningPathEngagement = ref([]);
  const challengeDifficulty = ref({});
  const lessonPerformance = ref([]);
  const sessionAnalytics = ref({});
  const topPerformers = ref([]);
  const recentActivity = ref([]);

  async function loadAllAnalytics(timeRange = '30d') {
    try {
      loading.value = true;
      error.value = null;

      const promises = [
        loadPlatformOverview(),
        loadUserGrowth(timeRange),
        loadSubmissionActivity(timeRange),
        loadLearningPaths(),
        loadChallengeDifficulty(),
        loadLessonPerformance(),
        loadSessionStats(),
        loadTopPerformers(),
        loadRecentActivity(),
      ];

      await Promise.all(promises);
      
    } catch (err) {
      error.value = err.message;
      console.error('Failed to load analytics:', err);
    } finally {
      loading.value = false;
    }
  }

  async function loadUserGrowth(range) {
    try {
      const response = await analyticsApi.getUserGrowth(range);
      // Ensure we always have an array, even if API returns object or null
      userGrowthData.value = Array.isArray(response.data) ? response.data : [];
      
      // Calculate stats from the timeline data
      if (userGrowthData.value.length > 0) {
        userGrowthStats.value = {
          dailyNewUsers: userGrowthData.value[userGrowthData.value.length - 1]?.new_users || 0,
          weeklyNewUsers: userGrowthData.value.slice(-7).reduce((sum, item) => sum + (item.new_users || 0), 0),
          monthlyGrowthRate: calculateGrowthRate(userGrowthData.value),
          totalUsers: userGrowthData.value.reduce((sum, item) => sum + (item.new_users || 0), 0)
        };
      }
    } catch (error) {
      console.error('Failed to load user growth:', error);
      userGrowthData.value = []; // Fallback to empty array
      userGrowthStats.value = {};
      throw error;
    }
  }

  async function loadSubmissionActivity(range) {
    try {
      const response = await analyticsApi.getSubmissionActivity(range);
      const data = response.data || {};
      
      // Ensure proper structure with fallbacks
      submissionActivity.value = {
        totalSubmissions: data.totalSubmissions || 0,
        passedSubmissions: data.passedSubmissions || 0,
        failedSubmissions: data.failedSubmissions || 0,
        successRate: data.successRate || 0,
        dailyStats: Array.isArray(data.dailyStats) ? data.dailyStats : [],
        languageUsage: Array.isArray(data.languageUsage) ? data.languageUsage : []
      };
    } catch (error) {
      console.error('Failed to load submission activity:', error);
      submissionActivity.value = {
        totalSubmissions: 0,
        passedSubmissions: 0,
        failedSubmissions: 0,
        successRate: 0,
        dailyStats: [],
        languageUsage: []
      };
      throw error;
    }
  }

  async function loadChallengeDifficulty() {
    try {
      const response = await analyticsApi.getChallengeDifficulty();
      const data = response.data || {};
      
      challengeDifficulty.value = {
        overall: data.overall || { avg_pass_rate: 0, avg_attempts: 0 },
        challenges: Array.isArray(data.challenges) ? data.challenges : []
      };
    } catch (error) {
      console.error('Failed to load challenge difficulty:', error);
      challengeDifficulty.value = {
        overall: { avg_pass_rate: 0, avg_attempts: 0 },
        challenges: []
      };
      throw error;
    }
  }

  async function loadSessionStats() {
    try {
      const response = await analyticsApi.getSessionStats();
      const data = response.data || {};
      
      sessionAnalytics.value = {
        dailyActivity: Array.isArray(data.dailyActivity) ? data.dailyActivity : [],
        peakHours: Array.isArray(data.peakHours) ? data.peakHours : []
      };
    } catch (error) {
      console.error('Failed to load session stats:', error);
      sessionAnalytics.value = {
        dailyActivity: [],
        peakHours: []
      };
      throw error;
    }
  }

  // Add this helper function to calculate growth rate
  function calculateGrowthRate(data) {
    if (!Array.isArray(data) || data.length < 2) return 0;
    
    const recent = data.slice(-1)[0]?.new_users || 0;
    const previous = data.slice(-2)[0]?.new_users || 0;
    
    if (previous === 0) return recent > 0 ? 100 : 0;
    
    return Math.round(((recent - previous) / previous) * 100);
  }



  async function loadPlatformOverview() {
    try {
      const response = await analyticsApi.getOverview();
      platformOverview.value = response.data;
    } catch (error) {
      console.error('Failed to load platform overview:', error);
      throw error;
    }
  }

  // ... keep the other methods the same but ensure they return arrays where needed

  async function loadLearningPaths() {
    try {
      const response = await analyticsApi.getLearningPaths();
      learningPathEngagement.value = Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Failed to load learning paths:', error);
      learningPathEngagement.value = [];
      throw error;
    }
  }

  async function loadLessonPerformance() {
    try {
      const response = await analyticsApi.getLessonPerformance();
      lessonPerformance.value = Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Failed to load lesson performance:', error);
      lessonPerformance.value = [];
      throw error;
    }
  }

  async function loadTopPerformers() {
    try {
      const response = await analyticsApi.getTopPerformers(5);
      topPerformers.value = Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Failed to load top performers:', error);
      topPerformers.value = [];
      throw error;
    }
  }

  async function loadRecentActivity() {
    try {
      const response = await analyticsApi.getRecentActivity(5);
      recentActivity.value = Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Failed to load recent activity:', error);
      recentActivity.value = [];
      throw error;
    }
  }

  return {
    // State
    loading,
    error,
    platformOverview,
    userGrowthData,
    userGrowthStats,
    submissionActivity,
    learningPathEngagement,
    challengeDifficulty,
    lessonPerformance,
    sessionAnalytics,
    topPerformers,
    recentActivity,
    
    // Methods
    loadAllAnalytics,
    loadPlatformOverview,
    loadUserGrowth,
    loadSubmissionActivity,
    loadLearningPaths,
    loadChallengeDifficulty,
    loadLessonPerformance,
    loadSessionStats,
    loadTopPerformers,
    loadRecentActivity
  };
}
