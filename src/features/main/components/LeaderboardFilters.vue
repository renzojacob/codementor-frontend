<template>
  <div class="bg-white p-4 rounded-xl border border-[var(--gry-200)] shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">

    <!-- Search -->
    <div class="flex items-center gap-3 w-full md:w-auto">
      <input
        v-model="localSearch"
        type="text"
        placeholder="Search users..."
        class="w-full px-4 py-2 rounded-lg border border-[var(--gry-300)] focus:ring-[var(--pri-400)] outline-none text-sm"
      />
    </div>

    <!-- Sort & Range -->
    <div class="flex items-center gap-4">

      <!-- Sort -->
      <div class="flex items-center gap-2">
        <label class="text-sm text-[var(--gry-600)]">Sort by</label>
        <select
          v-model="localSort"
          class="px-3 py-2 border border-[var(--gry-300)] rounded-lg text-sm"
        >
          <option value="xp">XP</option>
          <option value="level">Level</option>
          <option value="challenges">Challenges Solved</option>
        </select>
      </div>

      <!-- Range -->
      <div class="flex items-center gap-2">
        <label class="text-sm text-[var(--gry-600)]">Range</label>
        <select
          v-model="localRange"
          class="px-3 py-2 border border-[var(--gry-300)] rounded-lg text-sm"
        >
          <option value="all">All Time</option>
          <option value="month">This Month</option>
          <option value="week">This Week</option>
          <option value="day">Today</option>
        </select>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  sort: String,
  range: String,
  search: String,
});

const emit = defineEmits(["update:sort", "update:range", "update:search"]);

const localSort = ref(props.sort);
const localRange = ref(props.range);
const localSearch = ref(props.search);

watch(localSort, (v) => emit("update:sort", v));
watch(localRange, (v) => emit("update:range", v));
watch(localSearch, (v) => emit("update:search", v));
</script>
