<!-- src/components/layout/MobileNav.vue -->
<template>
  <nav
    class="sm:hidden bg-white border-b border-[var(--gry-200)] shadow-sm px-4 py-3 space-y-3"
  >
    <router-link
      v-for="item in nav"
      :key="item.to"
      :to="item.to"
      class="block py-2 text-[var(--gry-700)] font-medium hover:text-[var(--pri-600)] transition"
      @click="$emit('close')"
    >
      {{ item.label }}
    </router-link>
  </nav>
</template>

<script setup>
defineEmits(['close'])

const nav = [
  { label: 'Dashboard', to: '/' },
  { label: 'Challenges', to: '/challenges' },
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Profile', to: '/profile' },
]
</script>
