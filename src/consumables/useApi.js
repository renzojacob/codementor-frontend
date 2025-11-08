// src/consumables/useApi.js
const API_BASE =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'; // can set via .env

// Save tokens to localStorage
function saveTokens({ access_token, refresh_token }) {
  if (access_token) localStorage.setItem('access_token', access_token);
  if (refresh_token) localStorage.setItem('refresh_token', refresh_token);
}

// Remove tokens (for logout or invalid session)
function clearTokens() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}

// Generic request handler
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('access_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });

  // Try refreshing token on 401
  if (res.status === 401 && localStorage.getItem('refresh_token')) {
    const refreshed = await refreshToken();
    if (refreshed) {
      // Retry original request after refresh
      const retryHeaders = {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      };
      const retryRes = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: retryHeaders,
      });
      if (!retryRes.ok) throw new Error(await retryRes.text());
      return retryRes.json();
    } else {
      clearTokens();
      throw new Error('Session expired, please log in again.');
    }
  }

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || 'API request failed');
  }

  return res.json();
}

// Token refresh logic
async function refreshToken() {
  const refresh_token = localStorage.getItem('refresh_token');
  if (!refresh_token) return false;

  try {
    const res = await fetch(`${API_BASE}/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token }),
    });

    if (!res.ok) return false;

    const data = await res.json();
    saveTokens(data);
    return true;
  } catch {
    return false;
  }
}

// Auth functions
export async function login(username, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error(await res.text());

  const data = await res.json();
  saveTokens(data);
  return data;
}

export function logout() {
  clearTokens();
}

// Admin Stats functions
export async function getAdminStats() {
  return request('/admin/stats', { method: 'GET' });
}

export async function getUserGrowth(months = 6) {
  return request(`/admin/user-growth?months=${months}`, { method: 'GET' });
}

export async function getLessonEngagement(limit = 10) {
  return request(`/admin/lesson-engagement?limit=${limit}`, { method: 'GET' });
}

export async function getRecentActivity(limit = 10) {
  return request(`/admin/recent-activity?limit=${limit}`, { method: 'GET' });
}

// Simplified request helpers (for useTutorials, etc.)
export const useApi = () => ({
  get: (endpoint) => request(endpoint, { method: 'GET' }),
  post: (endpoint, body) =>
    request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body) =>
    request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  del: (endpoint) => request(endpoint, { method: 'DELETE' }),
  
  // Admin stats convenience methods
  admin: {
    getStats: () => getAdminStats(),
    getUserGrowth: (months = 6) => getUserGrowth(months),
    getLessonEngagement: (limit = 10) => getLessonEngagement(limit),
    getRecentActivity: (limit = 10) => getRecentActivity(limit),
  }
});