<template>
  <footer class="bg-gray-900 text-white">
    <!-- Main Footer -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Platform Info -->
        <div class="col-span-1 lg:col-span-2">
          <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <!-- <span class="text-white font-bold text-lg">&lt;/&gt;</span> -->
               <i class="fas fa-robot text-white"></i>
            </div>
            <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CodeMentor
            </span>
          <p class="text-gray-300 mb-4 max-w-md">
            Master coding with interactive tutorials, challenging problems, and real-world projects. 
            Your all-in-one platform for learning and practicing programming skills.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
              <i class="fab fa-twitter w-5 h-5"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
              <i class="fab fa-github w-5 h-5"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
              <i class="fab fa-linkedin w-5 h-5"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
              <i class="fab fa-discord w-5 h-5"></i>
            </a>
          </div>
        </div>

        <!-- Learn -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Learn</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/tutorials" class="text-gray-300 hover:text-white transition-colors duration-200">
                Tutorials
              </router-link>
            </li>
            <li>
              <router-link to="/courses" class="text-gray-300 hover:text-white transition-colors duration-200">
                Courses
              </router-link>
            </li>
            <li>
              <router-link to="/references" class="text-gray-300 hover:text-white transition-colors duration-200">
                References
              </router-link>
            </li>
            <li>
              <router-link to="/examples" class="text-gray-300 hover:text-white transition-colors duration-200">
                Examples
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Practice -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Practice</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/problems" class="text-gray-300 hover:text-white transition-colors duration-200">
                Coding Problems
              </router-link>
            </li>
            <li>
              <router-link to="/challenges" class="text-gray-300 hover:text-white transition-colors duration-200">
                Daily Challenges
              </router-link>
            </li>
            <li>
              <router-link to="/contests" class="text-gray-300 hover:text-white transition-colors duration-200">
                Contests
              </router-link>
            </li>
            <li>
              <router-link to="/playground" class="text-gray-300 hover:text-white transition-colors duration-200">
                Code Playground
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- Languages & Technologies -->
      <div class="border-t border-gray-700 mt-8 pt-8">
        <h3 class="text-lg font-semibold mb-4 text-center">Supported Languages & Technologies</h3>
        <div class="flex flex-wrap justify-center gap-4">
          <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">JavaScript</span>
          <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">Python</span>
          <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">Java</span>
          <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">C#</span>
          <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">PHP</span>
          <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">HTML/CSS</span>
        </div>
      </div>
    </div>

    <!-- Bottom Footer -->
    <div class="border-t border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div class="text-gray-400 text-sm">
            &copy; 2025 CodeMentor. All rights reserved.
          </div>
          <div class="flex space-x-6 text-sm">
            <router-link to="/privacy" class="text-gray-400 hover:text-white transition-colors duration-200">
              Privacy Policy
            </router-link>
            <router-link to="/terms" class="text-gray-400 hover:text-white transition-colors duration-200">
              Terms of Service
            </router-link>
            <router-link to="/cookies" class="text-gray-400 hover:text-white transition-colors duration-200">
              Cookie Policy
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>