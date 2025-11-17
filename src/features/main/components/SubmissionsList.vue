<template>
  <div class="bg-white p-4 rounded-xl border border-[var(--gry-200)] shadow-sm">
    <h3 class="text-sm font-semibold text-[var(--gry-900)] mb-3">Recent Submissions</h3>

    <ul class="space-y-2">
      <li v-for="s in submissions" :key="s.id" class="flex items-center justify-between gap-3 p-3 rounded-md border border-[var(--gry-100)]">
        <div class="text-sm">
          <div class="font-medium text-[var(--gry-900)]">#{{ s.id }} \u2014 {{ s.lang }}</div>
          <div class="text-xs text-[var(--gry-600)]">{{ s.date }}</div>
        </div>

        <div class="text-right">
          <div :class="statusClass(s.status)" class="font-semibold text-sm">
            {{ s.status }}
          </div>
          <div class="text-xs text-[var(--gry-500)]">{{ s.time }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({ submissions: Array })

function statusClass(status) {
  if (status.toLowerCase().includes('accept')) return 'text-[var(--acc-grn-600)]'
  if (status.toLowerCase().includes('wrong')) return 'text-[var(--acc-red-600)]'
  return 'text-[var(--gry-700)]'
}
</script>
