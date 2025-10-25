<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-800 text-white flex flex-col">
      <h1 class="text-xl font-bold p-4">Admin</h1>
      <nav class="flex-1 flex flex-col gap-2 p-2">
        <router-link to="/admin" class="p-2 hover:bg-gray-700 rounded">Dashboard</router-link>
        <router-link to="/admin/users" class="p-2 hover:bg-gray-700 rounded">Users</router-link>
        <router-link to="/admin/content" class="p-2 hover:bg-gray-700 rounded">Content</router-link>
        <router-link to="/admin/analytics" class="p-2 hover:bg-gray-700 rounded">Analytics</router-link>
      </nav>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <header class="bg-white shadow p-4 flex justify-between items-center">
        <h2 class="text-lg font-semibold">Admin Panel</h2>
        <div>
          <i class="fas fa-bell mr-4"></i>
          <i class="fas fa-user-circle"></i>
        </div>
      </header>
      <main class="flex-1 p-4 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>
