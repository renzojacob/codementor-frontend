<template>
  <main class="bg-gray-50 min-h-screen overflow-x-hidden">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 relative overflow-hidden">
      <!-- Animated background elements -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-10 w-20 h-20 flex items-center justify-center animate-float">
          <i class="fas fa-robot text-white text-9xl"></i>
        </div>
        <div class="absolute top-1/4 right-20 w-16 h-16 flex items-center justify-center animate-float" style="animation-delay: 1s;">
          <i class="fas fa-robot text-white text-6xl"></i>
        </div>
        <div class="absolute bottom-20 left-1/4 w-12 h-12 flex items-center justify-center animate-float" style="animation-delay: 2s;">
          <i class="fas fa-robot text-white text-3xl"></i>
        </div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 text-center relative z-10">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">Learn. Code. Conquer.</h1>
        <p class="text-lg md:text-xl mb-8 animate-fade-in-up" style="animation-delay: 0.2s;">
          Master programming languages, solve coding challenges, and level up your skills.
        </p>
        <router-link to="/learn" 
          class="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-500 ease-out transform hover:scale-105 hover:-translate-y-1 animate-fade-in-up"
          style="animation-delay: 0.4s;">
          Start Learning
        </router-link>
      </div>
    </section>

    <!-- Languages Section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center animate-fade-in-up">Learn Popular Languages</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <router-link 
            v-for="(lang, index) in languages" 
            :key="lang.name" 
            :to="lang.link"
            class="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-all duration-500 ease-out transform hover:scale-105 hover:-translate-y-2 group animate-fade-in-up flex flex-col items-center justify-center text-center"
            :style="`animation-delay: ${0.1 + index * 0.1}s;`">
            <div class="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full group-hover:scale-110 transition-transform duration-300"
                 :style="lang.color">
              <i class="fas fa-code text-white text-sm"></i>
            </div>
            <h3 class="font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-300 text-center w-full">{{ lang.name }}</h3>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Challenges Section -->
    <section class="py-16 bg-gray-100">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center animate-fade-in-up">Featured Challenges</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            v-for="(challenge, index) in challenges" 
            :key="challenge.title"
            class="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-all duration-500 ease-out transform hover:scale-105 hover:-translate-y-2 group animate-fade-in-up"
            :style="`animation-delay: ${0.2 + index * 0.1}s;`">
            <h3 class="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">{{ challenge.title }}</h3>
            <p class="text-gray-600 mb-4">{{ challenge.desc }}</p>
            <router-link :to="challenge.link" 
              class="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-all duration-300 group-hover:translate-x-2">
              Solve Challenge
              <i class="fas fa-arrow-right ml-2 transition-transform duration-300 group-hover:translate-x-1"></i>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 animate-fade-in-up">Why Choose CodeMentor?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="(benefit, index) in benefits" 
            :key="benefit.title"
            class="bg-white p-8 rounded-lg shadow hover:shadow-xl transition-all duration-500 ease-out transform hover:scale-105 hover:-translate-y-2 group animate-fade-in-up"
            :style="`animation-delay: ${0.3 + index * 0.1}s;`">
            <div class="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full group-hover:scale-110 transition-transform duration-300"
                 :style="benefit.bgColor">
              <i class="fas text-white text-xl" :class="benefit.icon"></i>
            </div>
            <h3 class="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">{{ benefit.title }}</h3>
            <p class="text-gray-600">{{ benefit.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-16 text-center relative overflow-hidden">
      <!-- Animated background elements -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute bottom-10 right-10 w-24 h-24 flex items-center justify-center animate-float">
          <i class="fas fa-robot text-white text-3xl"></i>
        </div>
        <div class="absolute top-1/3 left-20 w-14 h-14 flex items-center justify-center animate-float" style="animation-delay: 1.5s;">
          <i class="fas fa-robot text-white text-xl"></i>
        </div>
        <div class="absolute bottom-1/4 right-1/3 w-10 h-10 flex items-center justify-center animate-float" style="animation-delay: 2.5s;">
          <i class="fas fa-robot text-white text-lg"></i>
        </div>
      </div>
      
      <div class="max-w-4xl mx-auto px-4 relative z-10">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">Ready to Start Coding?</h2>
        <p class="mb-8 text-lg md:text-xl animate-fade-in-up" style="animation-delay: 0.2s;">
          Join thousands of learners and take on coding challenges today.
        </p>
        <router-link to="/learn" 
          class="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-500 ease-out transform hover:scale-105 hover:-translate-y-1 animate-fade-in-up"
          style="animation-delay: 0.4s;">
          Start Learning
        </router-link>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      languages: [
        { 
          name: 'JavaScript', 
          link: '/learn/javascript',
          color: 'background: linear-gradient(to right, #f59e0b, #d97706)'
        },
        { 
          name: 'Python', 
          link: '/learn/python',
          color: 'background: linear-gradient(to right, #6366f1, #4f46e5)'
        },
        { 
          name: 'PHP', 
          link: '/learn/php',
          color: 'background: linear-gradient(to right, #ef4444, #dc2626)'
        },
        { 
          name: 'Java', 
          link: '/learn/java',
          color: 'background: linear-gradient(to right, #10b981, #059669)'
        },
        { 
          name: 'C#', 
          link: '/learn/csharp',
          color: 'background: linear-gradient(to right, #8b5cf6, #7c3aed)'
        },
      ],
      challenges: [
        { title: 'FizzBuzz', desc: 'Test your logic with this classic challenge.', link: '/challenges/fizzbuzz' },
        { title: 'Two Sum', desc: 'Find pairs that add up to a target value.', link: '/challenges/two-sum' },
        { title: 'Palindrome Checker', desc: 'Verify if a string reads the same backward.', link: '/challenges/palindrome' },
      ],
      benefits: [
        { 
          title: 'Learn by Doing', 
          desc: 'Interactive tutorials and coding exercises.', 
          icon: 'fa-hands-helping',
          bgColor: 'background: linear-gradient(to right, #10b981, #059669)'
        },
        { 
          title: 'Level Up Skills', 
          desc: 'Solve real-world challenges and improve your logic.', 
          icon: 'fa-chart-line',
          bgColor: 'background: linear-gradient(to right, #f59e0b, #d97706)'
        },
        { 
          title: 'Join the Community', 
          desc: 'Share your progress and learn together.', 
          icon: 'fa-users',
          bgColor: 'background: linear-gradient(to right, #6366f1, #4f46e5)'
        },
      ],
    };
  },
};
</script>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-fade-in-up {
  opacity: 0;
  animation: fade-in-up 0.8s ease-out forwards;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Staggered animation for elements when they come into view */
@media (prefers-reduced-motion: no-preference) {
  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}
</style>