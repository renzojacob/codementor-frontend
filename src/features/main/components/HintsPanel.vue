<template>
  <div class="bg-white p-4 rounded-xl border border-[var(--gry-200)] shadow-sm">
    <h3 class="text-sm font-semibold text-[var(--gry-900)] mb-3">Hints</h3>

    <ul class="space-y-2">
      <li v-for="(h, i) in hints" :key="i" class="p-3 rounded-md border border-[var(--gry-100)] bg-[var(--gry-50)]">
        <details>
          <summary class="cursor-pointer text-sm text-[var(--gry-800)] font-medium">Hint {{ i + 1 }}</summary>
          <p class="mt-2 text-sm text-[var(--gry-600)]">{{ h }}</p>
        </details>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({ hints: Array })
</script>
