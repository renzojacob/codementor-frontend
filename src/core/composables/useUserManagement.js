import { ref } from 'vue';
import { userApi } from '@/core/api';

export function useUserManagement() {
  const loading = ref(false);
  const error = ref(null);

  const updateRole = async (userId, role) => {
    loading.value = true;
    error.value = null;
    
    try {
      await userApi.updateUserRole(userId, role);
      return { success: true };
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to update role';
      console.error('Error updating role:', err);
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  };

  const moderateUser = async (userId, action, reason = '') => {
    loading.value = true;
    error.value = null;
    
    try {
      await userApi.moderateUser(userId, { action, reason });
      return { success: true };
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to moderate user';
      console.error('Error moderating user:', err);
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    updateRole,
    moderateUser
  };
}