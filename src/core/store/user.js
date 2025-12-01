import { defineStore } from 'pinia';
import dayjs from 'dayjs';

export const useUserStore = defineStore('user', {
  state: () => ({
    id: null,
    username: '',
    email: '',
    token: '',
    role: 'user',
    lastLogin: null,
    isInitialized: false,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
    isAdmin: (state) => state.role === 'admin',
    formattedLastLogin: (state) =>
      state.lastLogin ? dayjs(state.lastLogin).format('YYYY-MM-DD HH:mm') : 'Never',
  },
  actions: {
    login(userData) {
      console.log('\U0001f534 UserStore.login() called with:', userData)
      
      this.id = userData.id;
      this.username = userData.username;
      this.email = userData.email;
      this.token = userData.token;
      this.role = userData.role || 'user';
      this.lastLogin = new Date();
      this.isInitialized = true;
      
      console.log('\U0001f7e2 UserStore after login:', {
        id: this.id,
        username: this.username,
        email: this.email,
        role: this.role,
        token: this.token
      })
    },
    logout() {
      console.log('\U0001f534 UserStore.logout() called')
      this.id = null;
      this.username = '';
      this.email = '';
      this.token = '';
      this.role = 'user';
      this.lastLogin = null;
      this.isInitialized = true;
    },
    setInitialized() {
      this.isInitialized = true;
    }
  },
  persist: {
    key: 'user-storage',
    paths: ['id', 'username', 'email', 'token', 'role', 'lastLogin', 'isInitialized'],
    storage: localStorage,
  },
});