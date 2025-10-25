// src/store/user.js
import { defineStore } from 'pinia';
import dayjs from 'dayjs';

export const useUserStore = defineStore('user', {
  state: () => ({
    id: null,
    username: '',
    email: '',
    token: '',
    role: 'user', // "user" | "admin"
    lastLogin: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
    isAdmin: (state) => state.role === 'admin',
    formattedLastLogin: (state) =>
      state.lastLogin ? dayjs(state.lastLogin).format('YYYY-MM-DD HH:mm') : 'Never',
  },
  actions: {
    login(userData) {
      this.id = userData.id;
      this.username = userData.username;
      this.email = userData.email;
      this.token = userData.token;
      this.role = userData.role || 'user';
      this.lastLogin = new Date();
    },
    logout() {
      this.id = null;
      this.username = '';
      this.email = '';
      this.token = '';
      this.role = 'user';
      this.lastLogin = null;
    },
  },
  persist: true,
});
