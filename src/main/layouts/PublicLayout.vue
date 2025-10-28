
<template>
  <div>
    <Header />
    <main class="container mx-auto p-4">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '../../components/layout/Header.vue';
import Footer from '../../components/layout/Footer.vue';
</script>

