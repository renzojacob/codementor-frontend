<!-- src/main/pages/learn/languages/javascript/Intro.vue -->
<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">JavaScript Introduction</h1>
    <p class="mb-4">JavaScript is a versatile programming language for web development...</p>

    <div class="bg-gray-100 border-l-4 border-green-500 p-4 mb-6">
      <h3 class="font-semibold mb-2">Example:</h3>
      <pre class="bg-white p-3 rounded overflow-x-auto text-sm">
console.log("Hello, World!");
      </pre>
      <RouterLink
        :to="`/learn/javascript/try?example=js1`"
        class="inline-block mt-3 bg-green-600 text-white px-4 py-2 rounded"
      >
        Try it Yourself »
      </RouterLink>
    </div>
  </div>
</template>
