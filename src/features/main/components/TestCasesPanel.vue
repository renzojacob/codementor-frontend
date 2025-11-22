<template>
  <div class="bg-white p-4 rounded-xl border border-[var(--gry-200)] shadow-sm">
    <h3 class="text-sm font-semibold text-[var(--gry-900)] mb-3">Test Cases</h3>

    <ul class="space-y-2">
      <li v-for="c in cases" :key="c.id" class="flex items-center justify-between gap-3 p-3 rounded-md border border-[var(--gry-100)]">
        <div>
          <div class="text-sm font-medium text-[var(--gry-900)]">{{ c.name }}</div>
          <div class="text-xs text-[var(--gry-600)]">Input: <span class="font-mono">{{ c.input }}</span></div>
        </div>

        <div class="text-right">
          <div v-if="resultFor(c.id)" class="text-sm font-semibold" :class="resultFor(c.id).status === 'Passed' ? 'text-[var(--acc-grn-600)]' : 'text-[var(--acc-red-600)]'">
            {{ resultFor(c.id).status }}
          </div>
          <div class="text-xs text-[var(--gry-500)]">Expected: <span class="font-mono">{{ c.expected_output }}</span></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  cases: Array,
  results: Array,
})

function resultFor(id) {
  return (props.results || []).find(r => r.id === id)
}
</script>
