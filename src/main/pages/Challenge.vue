<template>
  <div>
    <h2 class="text-2xl font-semibold mb-2">Challenge {{ $route.params.id }}</h2>
    <div class="flex gap-4">
      <textarea class="w-1/2 p-2 border rounded" placeholder="Write your code here"></textarea>
      <div class="w-1/2">
        <h3>Test Cases</h3>
        <ul>
          <li v-for="i in 3" :key="i">Test Case {{ i }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
