<!-- src/components/UserStatBox.vue -->
<template>
  <div class="rounded-xl p-4 bg-white border border-[var(--gry-200)] shadow-sm text-center">
    <p class="text-sm text-[var(--gry-500)] mb-1">{{ label }}</p>
    <p class="text-xl font-semibold text-[var(--gry-900)]">{{ value }}</p>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: [String, Number]
})
</script>
