import { defineStore } from 'pinia';

export const useAdminStore = defineStore('admin', {
  state: () => ({
    users: [],
    analytics: {
      totalUsers: 0,
      activeUsers: 0,
      submissionsToday: 0,
    },
  }),
  actions: {
    setUsers(userList) {
      this.users = userList;
      this.analytics.totalUsers = userList.length;
    },
    updateAnalytics(data) {
      this.analytics = { ...this.analytics, ...data };
    },
  },
  persist: false, // optional: do not persist analytics
});