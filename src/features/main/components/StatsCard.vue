<!-- src/features/main/components/StatsCard.vue -->
<template>
  <div class="bg-white p-5 rounded-xl shadow-sm border border-[var(--gry-200)] flex items-center gap-4">
    <div
      class="p-3 rounded-lg bg-[var(--pri-100)] text-[var(--pri-700)] flex items-center justify-center"
    >
      <component :is="iconComp" class="w-6 h-6" />
    </div>

    <div>
      <p class="text-sm text-[var(--gry-500)]">{{ title }}</p>
      <p class="text-2xl font-semibold text-[var(--gry-900)]">
        {{ value }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { CheckCircle, Target, Zap, Flame } from 'lucide-vue-next'

const props = defineProps({
  title: String,
  value: [String, Number],
  icon: String,
})

const icons = {
  'check-circle': CheckCircle,
  target: Target,
  zap: Zap,
  flame: Flame,
}

const iconComp = computed(() => icons[props.icon])
</script>
