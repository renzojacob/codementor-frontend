<!-- src/features/main/components/XPProgress.vue -->
<template>
  <div class="bg-white p-6 rounded-xl shadow-sm border border-[var(--gry-200)]">
    <h2 class="text-lg font-semibold mb-4 text-[var(--gry-900)]">
      XP Progress
    </h2>

    <div class="w-full bg-[var(--gry-200)] rounded-full h-4 overflow-hidden">
      <div
        class="h-full bg-[var(--pri-500)] transition-all duration-500"
        :style="{ width: progressPercent + '%' }"
      ></div>
    </div>

    <p class="mt-3 text-sm text-[var(--gry-600)]">
      {{ xp }} / {{ nextXp }} XP
    </p>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  xp: Number,
  nextXp: Number,
})

const progressPercent = computed(() =>
  Math.min(100, Math.round((props.xp / props.nextXp) * 100))
)
</script>
