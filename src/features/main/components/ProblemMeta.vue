<template>
  <div class="bg-white p-4 rounded-xl border border-[var(--gry-200)] shadow-sm flex flex-wrap gap-4">
    <div class="flex items-center gap-3">
      <div class="text-xs text-[var(--gry-600)]">XP</div>
      <div class="text-sm font-semibold text-[var(--gry-900)]">{{ meta.xp }}</div>
    </div>

    <div class="flex items-center gap-3">
      <div class="text-xs text-[var(--gry-600)]">Time</div>
      <div class="text-sm font-semibold text-[var(--gry-900)]">{{ meta.timeLimit }}</div>
    </div>

    <div class="flex items-center gap-3">
      <div class="text-xs text-[var(--gry-600)]">Memory</div>
      <div class="text-sm font-semibold text-[var(--gry-900)]">{{ meta.memoryLimit }}</div>
    </div>

    <div class="flex items-center gap-3 ml-auto text-sm text-[var(--gry-600)]">
      <span>{{ meta.accepted }} / {{ meta.submissions }} accepted</span>
    </div>
  </div>
</template>

<script setup>
defineProps({ meta: Object })
</script>
