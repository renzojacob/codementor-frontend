<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <AdminSidebar />

    <!-- Main content area -->
    <div class="flex-1 flex flex-col">
      <AdminHeader />
      <main class="flex-1 p-4 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import AdminSidebar from '../components/AdminSidebar.vue'
import AdminHeader from '../components/AdminHeader.vue'
</script>
