<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <Header />

    <!-- Make main flex-grow to remove extra white space -->
    <main class="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from '../../components/layout/Header.vue';
import Footer from '../../components/layout/Footer.vue';
</script>
