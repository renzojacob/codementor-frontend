<script setup>
import { useSubmissionsStore } from '../../store/submissions';
const submissions = useSubmissionsStore();

function simulateSubmission(result) {
  submissions.addSubmission({ result });
}
</script>

<template>
  <div class="space-x-2">
    <button @click="simulateSubmission('Passed')" class="px-4 py-2 bg-green-500 text-white rounded">
      Add Passed
    </button>
    <button @click="simulateSubmission('Failed')" class="px-4 py-2 bg-red-500 text-white rounded">
      Add Failed
    </button>
  </div>
</template>
