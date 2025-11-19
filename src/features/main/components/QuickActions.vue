<!-- src/features/main/components/QuickActions.vue -->
<template>
  <div class="bg-white p-6 rounded-xl shadow-sm border border-[var(--gry-200)]">
    <h3 class="text-lg font-semibold mb-4 text-[var(--gry-900)]">Quick Actions</h3>

    <div class="flex flex-wrap gap-4">
      <button class="px-4 py-2 bg-[var(--pri-600)] text-white rounded-lg hover:bg-[var(--pri-700)]">
        Continue Last Challenge
      </button>

      <button class="px-4 py-2 bg-[var(--acc-grn-600)] text-white rounded-lg hover:bg-[var(--acc-grn-500)]">
        Start New Challenge
      </button>

      <button class="px-4 py-2 bg-[var(--acc-ind-600)] text-white rounded-lg hover:bg-[var(--acc-ind-500)]">
        Browse Lessons
      </button>
    </div>
  </div>
</template>

<script setup></script>
