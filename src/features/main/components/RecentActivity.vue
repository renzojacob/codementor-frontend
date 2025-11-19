<!-- src/features/main/components/RecentActivity.vue -->
<template>
  <div class="bg-white p-6 rounded-xl shadow-sm border border-[var(--gry-200)]">
    <h3 class="text-lg font-semibold mb-4 text-[var(--gry-900)]">Recent Activity</h3>

    <ul class="space-y-3">
      <li
        v-for="(item, i) in items"
        :key="i"
        class="flex items-center gap-3 p-3 border border-[var(--gry-200)] rounded-lg"
      >
        <div class="w-2 h-2 rounded-full"
             :class="{
               'bg-[var(--pri-500)]': item.type === 'challenge',
               'bg-[var(--acc-ind-500)]': item.type === 'lesson'
             }"
        ></div>

        <p class="text-[var(--gry-700)] text-sm">{{ item.label }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  items: Array,
})
</script>
