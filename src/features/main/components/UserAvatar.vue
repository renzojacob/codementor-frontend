<!-- src/components/UserAvatar.vue -->
<template>
  <img
    :src="src"
    :alt="alt"
    class="rounded-full object-cover border border-[var(--gry-200)]"
    :style="{ width: size + 'px', height: size + 'px' }"
  />
</template>

<script setup>
defineProps({
  src: String,
  alt: { type: String, default: 'User Avatar' },
  size: { type: Number, default: 48 }
})
</script>
