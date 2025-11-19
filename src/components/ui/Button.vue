<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    v-bind="attrs"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed, useAttrs } from 'vue'
import clsx from 'clsx'

const props = defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
  disabled: { type: Boolean, default: false },
  class: { type: String, default: '' } // allow passing custom classes
})

const attrs = useAttrs()

// Common base styles for all buttons
const baseClasses = 'inline-flex items-center justify-center font-semibold rounded transition focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed'

// Styling variants
const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  outline: 'border border-gray-400 text-gray-800 hover:bg-gray-100'
}

// Sizes
const sizes = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
}

// Final computed classes
const buttonClasses = computed(() =>
  clsx(
    baseClasses,
    variants[props.variant] || variants.primary,
    sizes[props.size] || sizes.md,
    props.class // Allow adding extra custom classes in usage
  )
)
</script>
