<!-- src/features/main/components/ChallengeCard.vue -->
<template>
  <div
    class="p-5 bg-white rounded-xl border border-[var(--gry-200)] shadow-sm hover:shadow-md transition cursor-pointer"
    @click="$emit('open')"
  >
    <div class="flex justify-between items-start">
      <h3 class="text-lg font-semibold text-[var(--gry-900)]">
        {{ item.title }}
      </h3>

      <span
        class="px-2 py-1 text-xs rounded-md font-medium capitalize"
        :class="difficultyClass"
      >
        {{ item.difficulty }}
      </span>
    </div>

    <div class="mt-4 flex justify-between items-center">
      <p class="text-[var(--gry-500)] text-sm">
        {{ item.xp }} XP
      </p>

      <span
        v-if="item.solved"
        class="text-[var(--acc-grn-600)] text-sm font-medium"
      >
        \u2713 Solved
      </span>

      <span
        v-else
        class="text-[var(--gry-500)] text-sm"
      >
        Unsolved
      </span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  item: Object,
})
console.log(props.item.difficulty)
const difficultyClass = computed(() => {
  switch (props.item.difficulty) {
    case "easy":
      return "bg-[var(--acc-grn-500)]/10 text-[var(--acc-grn-600)]"
    case "medium":
      return "bg-[var(--acc-org-500)]/10 text-[var(--acc-org-600)]"
    case "hard":
      return "bg-[var(--acc-red-500)]/10 text-[var(--acc-red-600)]"
    default:
      return ""
  }
})
</script>
