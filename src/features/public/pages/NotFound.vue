<!-- src/views/NotFound.vue -->
<template>
  <main class="bg-gray-50 min-h-screen">
    <!-- Hero with error twist -->
    <section class="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">404 — Page Not Found</h1>
        <p class="text-lg md:text-xl mb-8">
          Oops! The page you're looking for doesn’t exist.
        </p>
        <router-link to="/" class="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium shadow hover:bg-gray-100 transition-all duration-200">
          ← Back to Home
        </router-link>
      </div>
    </section>

    <!-- Helpful links section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Where to go next?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <router-link to="/learn" class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center">
            <div class="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-blue-100 rounded-full">
              <i class="fas fa-graduation-cap text-blue-600"></i>
            </div>
            <h3 class="font-semibold text-gray-700">Start Learning</h3>
            <p class="text-sm text-gray-500 mt-2">Explore coding tutorials</p>
          </router-link>

          <router-link to="/challenges" class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center">
            <div class="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-purple-100 rounded-full">
              <i class="fas fa-trophy text-purple-600"></i>
            </div>
            <h3 class="font-semibold text-gray-700">Coding Challenges</h3>
            <p class="text-sm text-gray-500 mt-2">Test your problem-solving</p>
          </router-link>

          <router-link to="/admin" class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center">
            <div class="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-gray-200 rounded-full">
              <i class="fas fa-cog text-gray-700"></i>
            </div>
            <h3 class="font-semibold text-gray-700">Admin Dashboard</h3>
            <p class="text-sm text-gray-500 mt-2">For authorized users</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Friendly tip section -->
    <section class="py-12 bg-gray-100">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <div class="inline-block p-4 bg-white rounded-lg shadow">
          <i class="fas fa-lightbulb text-yellow-500 text-2xl mb-2"></i>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Tip</h3>
          <p class="text-gray-600">
            Double-check the URL, or use the navigation menu to find what you need.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'NotFound',
  mounted() {
    document.title = 'Page Not Found | CodeMentor';
  }
};
</script>