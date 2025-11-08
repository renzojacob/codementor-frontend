<template>
  <div class="p-2 border rounded h-full overflow-auto">
    <h3 class="font-bold mb-2">Test Cases</h3>
    <ul>
      <li v-for="(tc, index) in cases" :key="index" class="mb-1">
        Input: {{ tc.input }} | Expected: {{ tc.expected }}
      </li>
    </ul>
    <button @click="$emit('run')" class="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Run</button>
  </div>
</template>

<script setup>
const props = defineProps({
  cases: Array
});
</script>
