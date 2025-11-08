<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Background Pattern (optional) -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100" />
    
    <!-- Main Content -->
    <main class="flex-1 flex items-center justify-center p-4 relative z-10">
      <div class="w-full max-w-md">
        <slot />
      </div>
    </main>

    <!-- Simple Footer -->
    <footer v-if="showFooter" class="py-4 text-center text-gray-600 text-sm relative z-10 bg-white/80 backdrop-blur-sm border-t border-gray-200">
      <p>&copy; {{ currentYear }} Your Company. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'BlankLayout',
  props: {
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>