import { ref } from 'vue';
import { userApi } from '@/core/api';

export function useUserStats() {
  const stats = ref({
    totalUsers: 0,
    activeUsers: 0,
    avgProgress: 0,
    pendingApprovals: 0,
    aiInteractions: 0
  });

  const loading = ref(false);
  const error = ref(null);

  const loadStats = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await userApi.getStats();
      stats.value = response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to load stats';
      console.error('Error loading stats:', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    stats,
    loading,
    error,
    loadStats
  };
}