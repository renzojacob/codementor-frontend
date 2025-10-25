<template>
  <div class="flex flex-col h-screen">
    <header class="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 class="font-bold text-xl">Interactive Coding</h1>
      <nav>
        <router-link to="/api/editor" class="mr-4">Editor</router-link>
        <router-link to="/api/submissions" class="mr-4">Submissions</router-link>
        <router-link to="/api/progress">Progress</router-link>
      </nav>
    </header>

    <main class="flex-1 overflow-auto p-4">
      <slot />
    </main>
  </div>
</template>
