<!-- src/components/layout/Breadcrumbs.vue -->
<template>
  <div class="px-6 py-3 flex items-center gap-2 text-sm">

    <RouterLink
      to="/"
      class="text-[var(--gry-500)] hover:text-[var(--pri-600)]"
    >
      Home
    </RouterLink>

    <span class="text-[var(--gry-400)]">/</span>

    <span v-for="(crumb, index) in crumbs" :key="index" class="flex items-center gap-2">
      <RouterLink
        v-if="crumb.to"
        :to="crumb.to"
        class="text-[var(--gry-600)] hover:text-[var(--pri-600)]"
      >
        {{ crumb.label }}
      </RouterLink>

      <span v-else class="font-medium text-[var(--gry-800)]">
        {{ crumb.label }}
      </span>

      <span v-if="index < crumbs.length - 1" class="text-[var(--gry-400)]">/</span>
    </span>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Generate crumb trail from meta.breadcrumb
const crumbs = computed(() => {
  const matched = route.matched
  return matched
    .filter(r => r.meta?.breadcrumb)
    .map(r => ({
      label: r.meta.breadcrumb,
      to: r.path !== route.path ? r.path : null
    }))
})
</script>
