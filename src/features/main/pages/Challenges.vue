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

// mock data \u2014 replace with API later
const challenges = ref([
  { id: 1, title: "Reverse Linked List", slug: "reverse-linked-list", difficulty: "easy", xp: 50, solved: true },
  { id: 2, title: "Binary Tree Paths", slug: "binary-tree-paths", difficulty: "medium", xp: 120, solved: false },
  { id: 3, title: "LRU Cache", slug: "lru-cache", difficulty: "hard", xp: 200, solved: false },
  { id: 4, title: "Two Sum", slug: "two-sum", difficulty: "easy", xp: 20, solved: true },
  { id: 5, title: "Sort Colors", slug: "sort-colors", difficulty: "medium", xp: 70, solved: false },
])

const searchQuery = ref("")
const activeFilter = ref("all")

const filteredChallenges = computed(() => {
  return challenges.value.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesFilter =
      activeFilter.value === "all"
      || activeFilter.value === c.difficulty
      || (activeFilter.value === "solved" && c.solved)
      || (activeFilter.value === "unsolved" && !c.solved)

    return matchesSearch && matchesFilter
  })
})
</script>
