<!-- src/features/main/components/StreakIndicator.vue -->
<template>
  <div class="bg-white p-6 rounded-xl shadow-sm border border-[var(--gry-200)] flex flex-col items-center text-center">
    <Flame class="w-12 h-12 text-[var(--acc-org-600)] mb-2" />

    <h3 class="text-xl font-semibold text-[var(--gry-900)]">
      {{ days }} Day Streak
    </h3>

    <p class="text-[var(--gry-600)] text-sm">
      Keep it going!🔥
    </p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { Flame } from 'lucide-vue-next'

defineProps({
  days: Number,
})
</script>
