import { ref, computed } from 'vue';
import { userApi } from '@/core/api';

export function useUsers() {
  const users = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const filters = ref({
    search: '',
    role: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    lastActivity: '',
    progressRange: ''
  });

  const pagination = ref({
    currentPage: 1,
    perPage: 10,
    total: 0,
    lastPage: 1,
    from: 0,
    to: 0
  });

  const loadUsers = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      const params = {
        page: pagination.value.currentPage,
        perPage: pagination.value.perPage,
        ...filters.value
      };

      const response = await userApi.getUsers(params);
      const data = response.data;

      users.value = data.users;
      pagination.value = data.pagination;
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to load users';
      console.error('Error loading users:', err);
    } finally {
      loading.value = false;
    }
  };

  const clearFilters = () => {
    filters.value = {
      search: '',
      role: '',
      status: '',
      dateFrom: '',
      dateTo: '',
      lastActivity: '',
      progressRange: ''
    };
    pagination.value.currentPage = 1;
    loadUsers();
  };

  const previousPage = () => {
    if (pagination.value.currentPage > 1) {
      pagination.value.currentPage--;
      loadUsers();
    }
  };

  const nextPage = () => {
    if (pagination.value.currentPage < pagination.value.lastPage) {
      pagination.value.currentPage++;
      loadUsers();
    }
  };

  const goToPage = (page) => {
    if (typeof page === 'number' && page >= 1 && page <= pagination.value.lastPage) {
      pagination.value.currentPage = page;
      loadUsers();
    }
  };

  const visiblePages = computed(() => {
    const pages = [];
    const totalPages = pagination.value.lastPage;
    const current = pagination.value.currentPage;
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (current <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (current >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = current - 1; i <= current + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  });

  return {
    users,
    loading,
    error,
    filters,
    pagination,
    visiblePages,
    loadUsers,
    clearFilters,
    previousPage,
    nextPage,
    goToPage
  };
}