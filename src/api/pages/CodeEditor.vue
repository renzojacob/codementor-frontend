<template>
  <div class="grid grid-cols-2 gap-4 h-full">
    <textarea class="w-full h-full border rounded p-2" v-model="code"></textarea>
    <TestCases :cases="testCases" @run="runTests"/>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TestCases from '../components/TestCases.vue';

const code = ref('');
const testCases = ref([
  { input: '1', expected: '2' },
  { input: '2', expected: '4' }
]);

function runTests() {
  // Simulate code execution for demonstration
  console.log('Running code:', code.value);
  console.log('Test cases:', testCases.value);
}
</script>
