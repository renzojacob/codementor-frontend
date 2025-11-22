import { ref } from 'vue';
import { userApi } from '@/core/api';

export function useUserDetails() {
  const userProgress = ref({});
  const learningPaths = ref([]);
  const submissions = ref([]);
  const aiInteractions = ref([]);
  
  const loading = ref(false);
  const error = ref(null);

  const loadUserDetails = async (userId) => {
    loading.value = true;
    error.value = null;
    
    try {
      const [progressResponse, pathsResponse, submissionsResponse, aiResponse] = await Promise.all([
        userApi.getUserProgress(userId),
        userApi.getUserLearningPaths(userId),
        userApi.getUserSubmissions(userId),
        userApi.getUserAiInteractions(userId)
      ]);

      userProgress.value = progressResponse.data;
      learningPaths.value = pathsResponse.data;
      submissions.value = submissionsResponse.data;
      aiInteractions.value = aiResponse.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to load user details';
      console.error('Error loading user details:', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    userProgress,
    learningPaths,
    submissions,
    aiInteractions,
    loading,
    error,
    loadUserDetails
  };
}