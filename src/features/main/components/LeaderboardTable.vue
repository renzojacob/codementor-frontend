<template>
  <div class="bg-white p-4 rounded-xl border border-[var(--gry-200)] shadow-sm overflow-x-auto">
    <table class="w-full text-sm">
      <thead>
        <tr class="bg-[var(--gry-50)] text-[var(--gry-600)] text-left">
          <th class="py-3 px-4">Rank</th>
          <th class="py-3 px-4">User</th>
          <th class="py-3 px-4">Level</th>
          <th class="py-3 px-4">XP</th>
          <th class="py-3 px-4">Challenges</th>
        </tr>
      </thead>

      <tbody>
        <LeaderboardUserRow v-for="u in users" :key="u.id" :user="u" />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import LeaderboardUserRow from "./LeaderboardUserRow.vue";
defineProps({ users: Array });
</script>
