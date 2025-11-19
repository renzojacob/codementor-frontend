<template>
  <div class="bg-white p-6 rounded-xl border border-[var(--gry-200)] shadow-sm space-y-4">
    <h2 class="text-lg font-semibold text-[var(--gry-900)]">Problem</h2>

    <p class="text-sm text-[var(--gry-700)] whitespace-pre-wrap">{{ body }}</p>

    <div v-if="examples && examples.length" class="space-y-3 mt-4">
      <h3 class="font-medium text-[var(--gry-900)]">Examples</h3>

      <div v-for="(ex, i) in examples" :key="i" class="p-3 border border-[var(--gry-100)] rounded-md bg-[var(--gry-50)]">
        <div class="text-sm"><strong>Input:</strong> <span class="text-[var(--gry-700)]">{{ ex.input }}</span></div>
        <div class="text-sm"><strong>Output:</strong> <span class="text-[var(--pri-700)]">{{ ex.output }}</span></div>
        <div class="text-sm text-[var(--gry-600)]" v-if="ex.explanation"><strong>Explanation:</strong> {{ ex.explanation }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  body: String,
  examples: Array,
})
</script>
