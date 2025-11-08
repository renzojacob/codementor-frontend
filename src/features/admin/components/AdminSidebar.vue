<template>
  <aside class="w-64 bg-gray-900 text-gray-100 flex flex-col">
    <h1 class="text-2xl font-bold p-4 border-b border-gray-700">Admin</h1>
    <nav class="flex-1 flex flex-col p-2">
      <RouterLink to="/admin" class="link">Dashboard</RouterLink>
      <RouterLink to="/admin/users" class="link">Users</RouterLink>
      <RouterLink to="/admin/content" class="link">Content</RouterLink>
      <RouterLink to="/admin/analytics" class="link">Analytics</RouterLink>
      <RouterLink to="/admin/lessons" class="link">Lessons</RouterLink>
      <RouterLink to="/admin/settings" class="link">Settings</RouterLink>
    </nav>
  </aside>
</template>

<script setup></script>

<style scoped>
.link {
  @apply p-2 rounded hover:bg-gray-800 transition-colors duration-150;
}
.router-link-active {
  @apply bg-gray-800 text-white;
}
</style>
