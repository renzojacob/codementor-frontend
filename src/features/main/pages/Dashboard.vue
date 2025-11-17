<!-- src/features/main/pages/Dashboard.vue -->
<template>
  <div class="p-6 space-y-8">
    <!-- Top Row -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatsCard
        title="Total Challenges Solved"
        :value="stats.solved"
        icon="check-circle"
      />
      <StatsCard
        title="Accuracy"
        :value="stats.accuracy + '%'"
        icon="target"
      />
      <StatsCard
        title="Current Level"
        :value="stats.level"
        icon="zap"
      />
      <StatsCard
        title="Streak"
        :value="stats.streak + ' days'"
        icon="flame"
      />
    </div>

    <!-- Progress + Streak -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <XPProgress :xp="stats.xp" :next-xp="stats.nextXp" class="col-span-2" />
      <StreakIndicator :days="stats.streak" />
    </div>

    <!-- Quick Actions -->
    <QuickActions />

    <!-- Recent Activity -->
    <RecentActivity :items="stats.recent" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

import StatsCard from '../components/StatsCard.vue'
import XPProgress from '../components/XPProgress.vue'
import StreakIndicator from '../components/StreakIndicator.vue'
import QuickActions from '../components/QuickActions.vue'
import RecentActivity from '../components/RecentActivity.vue'

// mock for now \u2014 replace with API call
const stats = ref({
  solved: 87,
  accuracy: 92,
  level: 5,
  streak: 12,
  xp: 1250,
  nextXp: 2000,
  recent: [
    { type: 'challenge', label: 'Solved "Reverse Linked List"' },
    { type: 'lesson', label: 'Completed "Async JavaScript"' },
    { type: 'challenge', label: 'Attempted "Binary Search Trees"' },
  ],
})
</script>
