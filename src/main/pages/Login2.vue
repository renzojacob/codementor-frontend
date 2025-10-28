<template>
  <div class="max-w-sm mx-auto mt-20 bg-white p-6 rounded shadow">
    <h2 class="text-xl font-bold mb-4">Login</h2>

    <input
      v-model="username"
      type="text"
      placeholder="Username"
      class="border rounded p-2 w-full mb-2"
    />
    <input
      v-model="password"
      type="password"
      placeholder="Password"
      class="border rounded p-2 w-full mb-4"
    />

    <button
      @click="handleLogin"
      class="bg-blue-600 text-white px-4 py-2 rounded w-full mb-2"
      :disabled="loading"
    >
      Login
    </button>

    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../store/user';

// Constants
const API_BASE = 'http://localhost:3000'; // replace with your backend URL

const router = useRouter();
const user = useUserStore();

const username = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

// Save tokens to localStorage
function saveTokens({ access_token, refresh_token }) {
  localStorage.setItem('access_token', access_token);
  localStorage.setItem('refresh_token', refresh_token);
}

// Login function
async function handleLogin() {
  error.value = '';
  loading.value = true;

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value || "",
        password: password.value || '',
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || 'Login failed');
    }

    const data = await res.json();

    // Save tokens
    saveTokens(data.tokens);

    // Update Pinia store
    user.login({
      id: data.user.id, // temporary, replace with backend id later
      username: data.user.username,
      email: data.user.email,
      token: data.tokens.access_token,
      role: data.user.role,
    });

    // Redirect based on role
    if (data.user.role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/');
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}
</script>
