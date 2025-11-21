<!-- src/features/main/pages/Challenges.vue -->
<template>
  <div class="p-6 space-y-8">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <h1 class="text-2xl font-bold text-[var(--gry-900)]">Challenges</h1>

      <ChallengeSearch v-model="searchQuery" />
    </div>

    <ChallengeFilters
      :active="activeFilter"
      @update="val => activeFilter = val"
    />

    <ChallengeGrid :items="filteredChallenges" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import ChallengeGrid from '../components/ChallengeGrid.vue'
import ChallengeSearch from '../components/ChallengeSearch.vue'
import ChallengeFilters from '../components/ChallengeFilters.vue'

import { onMounted } from 'vue'
import { useChallenges } from '@/core/composables/useChallenges'

const searchQuery = ref("")
const activeFilter = ref("all")

const { challenges, fetchChallenges } = useChallenges()

onMounted(() => {
  fetchChallenges()
})

const filteredChallenges = computed(() => {
  return challenges.value.filter(c => {
    const q = searchQuery.value.toLowerCase()

    const matchesSearch =
      c.title.toLowerCase().includes(q)

    let matchesFilter = true

    switch (activeFilter.value) {
      case "easy":
      case "medium":
      case "hard":
        matchesFilter = c.difficulty === activeFilter.value
        break

      case "solved":
        matchesFilter = c.solved === true
        break

      case "unsolved":
        matchesFilter = c.solved === false
        break

      default: // "all"
        matchesFilter = true
    }

    return matchesSearch && matchesFilter
  })
})

</script>
