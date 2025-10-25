<template>
  <button :class="buttonClasses"><slot /></button>
</template>

<script setup>
import { computed } from 'vue';
import clsx from 'clsx';

const props = defineProps({
  variant: { type: String, default: 'primary' }
});

const buttonClasses = computed(() =>
  clsx(
    'px-4 py-2 rounded font-semibold transition',
    props.variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
    props.variant === 'secondary' && 'bg-gray-200 text-gray-800 hover:bg-gray-300'
  )
);
</script>
