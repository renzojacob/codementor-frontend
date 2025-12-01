<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full text-center">
      <div class="mb-8">
        <i class="fas fa-exclamation-triangle text-yellow-500 text-6xl mb-4"></i>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p class="text-gray-600 mb-6">
          You don't have permission to access this page.
        </p>
      </div>
      <div class="space-y-4">
        <button 
          @click="$router.push('/')"
          class="w-full bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors"
        >
          Go Home
        </button>
        <button 
          @click="$router.back()"
          class="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  </div>
</template>