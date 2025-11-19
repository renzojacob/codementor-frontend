<!-- src/features/main/components/ChallengeGrid.vue -->
<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <ChallengeCard
      v-for="item in items"
      :key="item.id"
      :item="item"
      @open="open(item)"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import ChallengeCard from './ChallengeCard.vue'
import { useRouter } from 'vue-router'

defineProps({
  items: Array,
})

const router = useRouter()
const open = (item) => router.push(`/app/challenges/${item.slug}`)
</script>
