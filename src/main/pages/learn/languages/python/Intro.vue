<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Python Introduction</h1>
    <p class="mb-4">Python is a popular programming language used for web development, AI, and data analysis.</p>

    <div class="bg-gray-100 border-l-4 border-green-500 p-4 mb-6">
      <h3 class="font-semibold mb-2">Example:</h3>
      <pre class="bg-white p-3 rounded overflow-x-auto text-sm">
print("Hello, World!")
      </pre>
      <RouterLink
        :to="`/learn/${$route.params.lang}/try?example=py1`"
        class="inline-block mt-3 bg-green-600 text-white px-4 py-2 rounded"
      >
        Try it Yourself »
      </RouterLink>
    </div>
  </div>
</template>
