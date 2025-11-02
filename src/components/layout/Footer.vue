<template>
  <footer class="bg-white border-t border-gray-200">
    <div class="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div>
          <router-link to="/" class="flex items-center space-x-2 mb-3">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <i class="fas fa-robot text-white"></i>
            </div>
            <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CodeMentor
            </span>
          </router-link>
          <p class="text-gray-500 text-sm">
            Learn coding, solve challenges, and grow your developer journey.
          </p>
        </div>

        <!-- Learn & Practice -->
        <div>
          <h3 class="text-gray-700 font-semibold mb-4">Explore</h3>
          <ul class="space-y-2 text-gray-600 text-sm">
            <li><router-link to="/learn" class="hover:text-blue-600">Learn</router-link></li>
            <li><router-link to="/challenges" class="hover:text-blue-600">Challenges</router-link></li>
            <li><router-link to="/leaderboard" class="hover:text-blue-600">Leaderboard</router-link></li>
          </ul>
        </div>

        <!-- Community -->
        <div>
          <h3 class="text-gray-700 font-semibold mb-4">Community</h3>
          <ul class="space-y-2 text-gray-600 text-sm">
            <li><a href="#" class="hover:text-blue-600">Forum</a></li>
            <li><a href="#" class="hover:text-blue-600">Discord</a></li>
            <li><a href="#" class="hover:text-blue-600">Blog</a></li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h3 class="text-gray-700 font-semibold mb-4">Resources</h3>
          <ul class="space-y-2 text-gray-600 text-sm">
            <li><router-link to="/login" class="hover:text-blue-600">Sign In</router-link></li>
            <li><router-link to="/register" class="hover:text-blue-600">Get Started</router-link></li>
            <li><a href="#" class="hover:text-blue-600">Contact</a></li>
          </ul>

          <div class="mt-4 flex space-x-3">
            <a href="#" class="text-gray-500 hover:text-blue-600"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="text-gray-500 hover:text-blue-600"><i class="fab fa-twitter"></i></a>
            <a href="#" class="text-gray-500 hover:text-blue-600"><i class="fab fa-github"></i></a>
          </div>
        </div>
      </div>

      <div class="mt-10 border-t border-gray-200 pt-4 text-center text-gray-400 text-sm">
        &copy; {{ new Date().getFullYear() }} CodeMentor. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script>
export default { name: 'Footer' };
</script>
