import { defineStore } from 'pinia';

export const useSubmissionsStore = defineStore('submissions', {
  state: () => ({
    items: [],
  }),
  getters: {
    total: (state) => state.items.length,
    passed: (state) => state.items.filter((s) => s.result === 'Passed').length,
    failed: (state) => state.items.filter((s) => s.result === 'Failed').length,
  },
  actions: {
    addSubmission(submission) {
      this.items.push({ ...submission, date: new Date().toISOString() });
    },
    clearAll() {
      this.items = [];
    },
  },
  persist: true,
});