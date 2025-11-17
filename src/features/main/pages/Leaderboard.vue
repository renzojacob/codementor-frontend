<template>
  <div class="p-6 space-y-6">

    <!-- Page Title -->
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold text-[var(--gry-900)]">Leaderboard</h1>
    </header>

    <!-- Filters -->
    <LeaderboardFilters
      :sort="sort"
      :range="range"
      :search="search"
      @update:sort="sort = $event"
      @update:range="range = $event"
      @update:search="search = $event"
    />

    <!-- Table -->
    <LeaderboardTable :users="filteredUsers" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import LeaderboardFilters from "../components/LeaderboardFilters.vue";
import LeaderboardTable from "../components/LeaderboardTable.vue";

// Mock data \u2013 replace with API/composable
const users = ref([
  { id: 1, username: "\u4e3867", level: 42, xp: 15000, challenges: 127, rank: 1 },
  { id: 2, username: "hxvoid", level: 40, xp: 13200, challenges: 118, rank: 2 },
  { id: 3, username: "neo", level: 36, xp: 10200, challenges: 95, rank: 3 },
  { id: 4, username: "aria", level: 33, xp: 8700, challenges: 77, rank: 4 },
  { id: 5, username: "ghost", level: 30, xp: 7000, challenges: 67, rank: 5 },
]);

let sort = ref("xp");
let range = ref("all");
let search = ref("");

// Computed filtering
const filteredUsers = computed(() => {
  let arr = [...users.value];

  if (search.value.trim()) {
    arr = arr.filter((u) =>
      u.username.toLowerCase().includes(search.value.toLowerCase())
    );
  }

  if (sort.value === "xp") arr.sort((a, b) => b.xp - a.xp);
  if (sort.value === "level") arr.sort((a, b) => b.level - a.level);
  if (sort.value === "challenges") arr.sort((a, b) => b.challenges - a.challenges);

  return arr;
});
</script>
