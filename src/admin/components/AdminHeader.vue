<template>
  <header class="bg-white shadow p-4 flex justify-between items-center">
    <h2 class="text-lg font-semibold">Admin Panel</h2>
    <div class="flex items-center gap-4">
      <button class="relative">
        <i class="fas fa-bell text-gray-600"></i>
        <span class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      <div class="flex items-center gap-2 cursor-pointer">
        <i class="fas fa-user-circle text-2xl text-gray-700"></i>
        <span class="text-sm text-gray-700 font-medium">Admin</span>
      </div>
    </div>
  </header>
</template>
