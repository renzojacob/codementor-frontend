const API_BASE = 'http://localhost:3000';// Replace with your PHP backend URL

// Save tokens to localStorage
function saveTokens({ access_token, refresh_token }) {
  localStorage.setItem('access_token', access_token);
  localStorage.setItem('refresh_token', refresh_token);
}

// Login function
export async function login(username, password) {
  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || 'Login failed');
    }

    const data = await res.json();

    // Save tokens
    saveTokens(data);

    return data; // { access_token, refresh_token }
  } catch (err) {
    console.error('Login error:', err.message);
    throw err;
  }
}

// Example: fetch with access token
export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('access_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || 'API request failed');
  }

  return res.json();
}