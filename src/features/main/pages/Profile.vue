<!-- src/pages/Profile.vue -->
<template>
  <div class="p-6 space-y-8">

    <!-- Header -->
    <div class="flex items-center gap-6">
      <UserAvatar :src="user.avatar" :size="96" />

      <div>
        <h1 class="text-2xl font-semibold text-[var(--gry-900)]">
          {{ user.name }}
        </h1>
        <p class="text-[var(--gry-500)] text-sm">
          @{{ user.username }}
        </p>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <UserStatBox label="Level" :value="user.level" />
      <UserStatBox label="XP" :value="user.xp" />
      <UserStatBox label="Streak" :value="user.streak + ' days'" />
    </div>

    <!-- Bio -->
    <div class="rounded-xl p-4 border border-[var(--gry-200)] bg-white shadow-sm">
      <h2 class="text-lg font-medium mb-2 text-[var(--gry-800)]">Bio</h2>
      <p class="text-[var(--gry-600)] text-sm leading-relaxed">
        {{ user.bio }}
      </p>
    </div>

    <!-- Recent Activity -->
    <div class="rounded-xl p-4 border border-[var(--gry-200)] bg-white shadow-sm">
      <h2 class="text-lg font-medium text-[var(--gry-800)] mb-4">
        Recent Activity
      </h2>

      <ul class="space-y-3">
        <li
          v-for="(item, index) in recent"
          :key="index"
          class="flex items-start justify-between bg-[var(--gry-50)] p-3 rounded-lg border border-[var(--gry-100)]"
        >
          <div>
            <p class="text-[var(--gry-800)] font-medium text-sm">
              {{ item.title }}
            </p>
            <p class="text-[var(--gry-500)] text-xs">
              {{ item.date }}
            </p>
          </div>

          <span
            class="text-xs font-semibold"
            :class="{
              'text-[var(--acc-grn-600)]': item.type === 'completed',
              'text-[var(--acc-ind-600)]': item.type === 'solved',
              'text-[var(--acc-org-600)]': item.type === 'attempted'
            }"
          >
            {{ item.type }}
          </span>
        </li>
      </ul>
    </div>

  </div>
</template>

<script setup>
import UserAvatar from '../components/UserAvatar.vue'
import UserStatBox from '../components/UserStatBox.vue'

const user = {
  name: 'John Doe',
  username: 'johnnydev',
  avatar: 'https://i.pravatar.cc/150?img=6',
  level: 12,
  xp: 3450,
  streak: 7,
  bio: 'Full-stack developer exploring algorithms and problem-solving daily.'
}

const recent = [
  { title: 'Solved "Two Sum"', type: 'solved', date: '2 hours ago' },
  { title: 'Completed challenge "Array Mastery"', type: 'completed', date: '1 day ago' },
  { title: 'Attempted "Binary Tree Path Sum"', type: 'attempted', date: '2 days ago' }
]
</script>

<!-- Possible additions:
1. Editable profile (change avatar, bio, username)
2. Full settings page (password change, notifications, theme, security)
3. Badges section
4. Activity timeline (GitHub style)
5. Social connections / followers
6. Challenges summary section -->
