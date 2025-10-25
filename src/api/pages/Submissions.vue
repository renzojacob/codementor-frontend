<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Past Submissions</h2>
    <ul class="space-y-2">
      <li v-for="(sub, i) in submissions" :key="i" class="p-2 border rounded">
        {{ sub.date }} - Result: {{ sub.result }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const submissions = ref([
  { date: '2025-10-25', result: 'Passed' },
  { date: '2025-10-24', result: 'Failed' }
]);
</script>
