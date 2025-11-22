<template>
  <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 class="text-2xl font-semibold text-[var(--gry-900)]">{{ title }}</h1>

      <div class="mt-2 flex items-center gap-3 flex-wrap">
        <span
          class="px-2 py-1 rounded-md text-xs font-medium capitalize"
          :class="difficultyClass"
        >
          {{ difficulty }}
        </span>

        <span v-if="solved" class="text-sm text-[var(--acc-grn-600)] font-medium">✓ Solved</span>

        <div class="flex items-center gap-2 text-sm text-[var(--gry-600)]">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2v6" stroke-width="1.5"/></svg>
          <span v-for="tag in tags" :key="tag" class="px-2 py-0.5 rounded-md bg-[var(--gry-100)] text-[var(--gry-700)] text-xs">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <router-link to="/app/challenges">
      <button class="px-3 py-2 rounded-md border border-[var(--card-border)] hover:bg-[var(--pri-50)] text-sm">
        Cancel
      </button></router-link>

      <button class="px-3 py-2 rounded-md bg-[var(--pri-600)] text-white hover:bg-[var(--pri-700)] text-sm">
        Submit Solution
      </button>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { defineProps } from 'vue'

const props = defineProps({
  title: String,
  difficulty: String,
  solved: Boolean,
  tags: { type: Array, default: () => [] },
})

const difficultyClass = computed(() => {
  switch (props.difficulty) {
    case 'easy': return 'bg-[var(--acc-grn-500)]/10 text-[var(--acc-grn-600)]'
    case 'medium': return 'bg-[var(--acc-org-500)]/10 text-[var(--acc-org-600)]'
    case 'hard': return 'bg-[var(--acc-red-500)]/10 text-[var(--acc-red-600)]'
    default: return 'bg-[var(--gry-100)] text-[var(--gry-700)]'
  }
})
</script>
