<template>
  <div class="debug-container">
    <h3>Connection Debug</h3>
    <button @click="testConnection">Test Backend Connection</button>
    <button @click="testCORS">Test CORS</button>
    
    <div v-if="debugResult">
      <h4>Result:</h4>
      <pre>{{ debugResult }}</pre>
    </div>
    
    <div v-if="debugError" class="error">
      <h4>Error:</h4>
      <pre>{{ debugError }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const debugResult = ref(null)
const debugError = ref(null)

const testConnection = async () => {
  try {
    debugError.value = null
    debugResult.value = 'Testing connection...'
    
    const response = await fetch('http://localhost:3000/', {
      method: 'GET',
      mode: 'cors',
    })
    
    debugResult.value = {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      ok: response.ok
    }
  } catch (err) {
    debugError.value = {
      name: err.name,
      message: err.message,
      stack: err.stack
    }
  }
}

const testCORS = async () => {
  try {
    debugError.value = null
    debugResult.value = 'Testing CORS with auth endpoint...'
    
    const response = await fetch('https://codementor-backend-7fm4.onrender.com/auth/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'test',
        password: 'test'
      })
    })
    
    debugResult.value = {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    }
  } catch (err) {
    debugError.value = {
      name: err.name,
      message: err.message,
      code: err.code
    }
  }
}
</script>