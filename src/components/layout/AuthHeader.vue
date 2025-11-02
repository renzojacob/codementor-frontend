<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
      
      <!-- Logo -->
      <router-link to="/" class="flex items-center space-x-2">
        <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
          <i class="fas fa-robot text-white"></i>
        </div>
        <span class="text-xl font-bold text-blue-600">CodeMentor</span>
      </router-link>

      <!-- Minimal Nav -->
      <nav class="hidden md:flex items-center space-x-6">
        <router-link 
          to="/" 
          class="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
          active-class="text-blue-600"
        >
          Home
        </router-link>
        <router-link 
          to="/help" 
          class="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
          active-class="text-blue-600"
        >
          Help
        </router-link>
      </nav>

      <!-- Optional mobile menu -->
      <button 
        @click="showMobileMenu = !showMobileMenu"
        class="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
      >
        <i class="fas fa-bars w-5 h-5"></i>
      </button>
    </div>

    <!-- Mobile menu -->
    <div v-if="showMobileMenu" class="md:hidden border-t border-gray-200 py-4 space-y-2 px-4">
      <router-link to="/" class="block text-gray-600 hover:text-blue-600">Home</router-link>
      <router-link to="/help" class="block text-gray-600 hover:text-blue-600">Help</router-link>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const showMobileMenu = ref(false);
</script>
