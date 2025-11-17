<!-- src/features/main/components/ChallengeFilters.vue -->
<template>
  <div class="flex flex-wrap gap-3">
    <button
      v-for="f in filters"
      :key="f.value"
      @click="$emit('update', f.value)"
      class="px-4 py-2 rounded-lg border font-medium text-sm transition"
      :class="active === f.value
        ? 'bg-[var(--pri-600)] text-white border-[var(--pri-600)]'
        : 'bg-white border-[var(--gry-300)] text-[var(--gry-700)] hover:bg-[var(--gry-100)]'
      "
    >
      {{ f.label }}
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  active: String
})

const filters = [
  { label: "All", value: "all" },
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
  { label: "Solved", value: "solved" },
  { label: "Unsolved", value: "unsolved" },
]

defineEmits(["update"])
</script>
