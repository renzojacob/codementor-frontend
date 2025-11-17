<template>
  <tr class="border-b border-[var(--gry-200)] hover:bg-[var(--pri-50)]/40 transition">
    <td class="py-3 px-4 font-semibold text-[var(--gry-900)]">
      {{ user.rank }}
    </td>

    <td class="py-3 px-4">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-full bg-[var(--gry-200)] flex items-center justify-center text-[var(--gry-600)] font-bold"
        >
          {{ user.username.charAt(0).toUpperCase() }}
        </div>
        <div>
          <div class="font-medium text-[var(--gry-900)]">{{ user.username }}</div>
          <div class="text-xs text-[var(--gry-600)]">ID: {{ user.id }}</div>
        </div>
      </div>
    </td>

    <td class="py-3 px-4 text-[var(--gry-800)]">{{ user.level }}</td>
    <td class="py-3 px-4 text-[var(--pri-700)] font-semibold">{{ user.xp }}</td>
    <td class="py-3 px-4 text-[var(--gry-800)]">{{ user.challenges }}</td>
  </tr>
</template>

<script setup>
defineProps({ user: Object });
</script>
