<template>
  <div class="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
    <!-- Summary -->
    <div class="text-sm text-gray-600">
      Showing 
      <span class="font-medium">{{ startItem }}</span>–
      <span class="font-medium">{{ endItem }}</span> 
      of 
      <span class="font-medium">{{ totalItems }}</span>
    </div>

    <!-- Page buttons -->
    <div class="flex items-center space-x-1">
      <button
        class="px-3 py-1 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
      >
        < Prev
      </button>

      <button
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        class="px-3 py-1 rounded-md font-medium transition-colors duration-150"
        :class="page === currentPage 
          ? 'bg-blue-600 text-white' 
          : 'text-gray-700 hover:bg-gray-100'"
      >
        {{ page }}
      </button>

      <button
        class="px-3 py-1 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
      >
        Next >
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    totalItems: { type: Number, required: true },
    pageSize: { type: Number, default: 10 },
    currentPage: { type: Number, default: 1 }
  },
  emits: ['page-change'],
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.pageSize);
    },
    startItem() {
      return (this.currentPage - 1) * this.pageSize + 1;
    },
    endItem() {
      return Math.min(this.currentPage * this.pageSize, this.totalItems);
    },
    visiblePages() {
      // Simple pagination window (e.g., 5 pages visible)
      const total = this.totalPages;
      const current = this.currentPage;
      const delta = 2;
      const start = Math.max(1, current - delta);
      const end = Math.min(total, current + delta);
      const pages = [];
      for (let i = start; i <= end; i++) pages.push(i);
      return pages;
    }
  },
  methods: {
    goToPage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.$emit('page-change', page);
    }
  }
}
</script>
