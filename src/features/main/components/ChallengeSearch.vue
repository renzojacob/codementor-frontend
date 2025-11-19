<!-- src/features/main/components/ChallengeSearch.vue -->
<template>
  <input
    type="text"
    class="px-4 py-2 w-full md:w-72 rounded-lg border border-[var(--gry-300)] focus:border-[var(--pri-500)] focus:ring-[var(--pri-500)] focus:ring-1 outline-none"
    placeholder="Search challenges..."
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
defineProps({
  modelValue: String,
})

defineEmits(["update:modelValue"])
</script>
