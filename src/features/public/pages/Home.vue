<template>
  <main class="bg-gray-50 min-h-screen">
    <!-- Hero -->
    <section class="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Learn. Code. Conquer.</h1>
        <p class="text-lg md:text-xl mb-8">
          Master programming languages, solve coding challenges, and level up your skills.
        </p>
        <router-link to="/learn" class="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium shadow hover:bg-gray-100 transition-all duration-200">
          Start Learning
        </router-link>
      </div>
    </section>

    <!-- Languages -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Learn Popular Languages</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <router-link v-for="lang in languages" :key="lang.name" :to="lang.link"
            class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center">
            <div class="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-gray-200 rounded-full">
              <i class="fas fa-robot text-gray-700"></i>
            </div>
            <h3 class="font-semibold text-gray-700">{{ lang.name }}</h3>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Challenges -->
    <section class="py-16 bg-gray-100">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Challenges</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="challenge in challenges" :key="challenge.title"
            class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-200">
            <h3 class="text-xl font-semibold mb-2">{{ challenge.title }}</h3>
            <p class="text-gray-600 mb-4">{{ challenge.desc }}</p>
            <router-link :to="challenge.link" class="text-blue-600 font-medium hover:underline">
              Solve Challenge ->
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-gray-800 mb-8">Why Choose CodeMentor?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="benefit in benefits" :key="benefit.title"
            class="bg-white p-8 rounded-lg shadow hover:shadow-lg transition duration-200">
            <i class="fas fa-robot text-4xl" :class="benefit.color + ' mb-4'"></i>
            <h3 class="text-xl font-semibold mb-2">{{ benefit.title }}</h3>
            <p class="text-gray-600">{{ benefit.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-16 text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Start Coding?</h2>
      <p class="mb-8 text-lg md:text-xl">Join thousands of learners and take on coding challenges today.</p>
      <router-link to="/learn" class="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium shadow hover:bg-gray-100 transition-all duration-200">
        Start Learning
      </router-link>
    </section>
  </main>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      languages: [
        { name: 'JavaScript', link: '/learn/javascript' },
        { name: 'Python', link: '/learn/python' },
        { name: 'PHP', link: '/learn/php' },
        { name: 'Java', link: '/learn/java' },
        { name: 'C#', link: '/learn/csharp' },
      ],
      challenges: [
        { title: 'FizzBuzz', desc: 'Test your logic with this classic challenge.', link: '/challenges/fizzbuzz' },
        { title: 'Two Sum', desc: 'Find pairs that add up to a target value.', link: '/challenges/two-sum' },
        { title: 'Palindrome Checker', desc: 'Verify if a string reads the same backward.', link: '/challenges/palindrome' },
      ],
      benefits: [
        { title: 'Learn by Doing', desc: 'Interactive tutorials and coding exercises.', color: 'text-blue-500' },
        { title: 'Level Up Skills', desc: 'Solve real-world challenges and improve your logic.', color: 'text-purple-500' },
        { title: 'Join the Community', desc: 'Share your progress and learn together.', color: 'text-green-500' },
      ],
    };
  },
};
</script>
