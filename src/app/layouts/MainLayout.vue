<!-- src/app/layouts/MainLayout.vue -->
<template>
  <div class="flex h-screen bg-[var(--gry-50)]">
    <div class="flex-1 flex flex-col">

      <Header
        @toggleNav="mobileNavOpen = !mobileNavOpen"
      />

      <!-- Breadcrumbs -->
      <Breadcrumbs class="bg-white border-b border-[var(--gry-200)]" />

      <!-- Optional mobile nav -->
      <MobileNav
        v-if="mobileNavOpen"
        @close="mobileNavOpen = false"
      />

      <main class="flex-1 p-4 overflow-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '@/components/layout/MainHeader.vue'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import MobileNav from '@/components/layout/MainMobileNav.vue'

const mobileNavOpen = ref(false)
</script>
