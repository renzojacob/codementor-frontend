
<template>
  <div>
    <AuthHeader />
    <main class="container mx-auto p-4">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import AuthHeader from '../../components/layout/AuthHeader.vue';
import Footer from '../../components/layout/Footer.vue';
</script>

