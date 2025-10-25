<!-- src/main/pages/Login.vue -->
<template>
  <div class="max-w-sm mx-auto mt-20 bg-white p-6 rounded shadow">
    <h2 class="text-xl font-bold mb-4">Login</h2>

    <input v-model="username" type="text" placeholder="Username" class="border rounded p-2 w-full mb-2" />
    <input v-model="password" type="password" placeholder="Password" class="border rounded p-2 w-full mb-4" />

    <button @click="handleLogin('user')" class="bg-blue-600 text-white px-4 py-2 rounded w-full mb-2">
      Login as User
    </button>
    <button @click="handleLogin('admin')" class="bg-green-600 text-white px-4 py-2 rounded w-full">
      Login as Admin
    </button>
  </div>
</template>

<script setup>
import { useUserStore } from '../../store/user';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const user = useUserStore();
const username = ref('');
const password = ref('');

function handleLogin(role) {
  user.login({
    id: Date.now(),
    username: username.value || role.toUpperCase(),
    email: `${username.value}@example.com`,
    token: 'sampletoken',
    role,
  });

  // Redirect
  router.push(role === 'admin' ? '/admin' : '/api/editor');
}
</script>
