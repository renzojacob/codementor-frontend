// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/login',
    LOGOUT: '/logout',
    REGISTER: '/register',
    REFRESH: '/refresh'
  },
  ADMIN: {
    STATS: '/admin/stats',
    USER_GROWTH: '/admin/user-growth',
    LESSON_ENGAGEMENT: '/admin/lesson-engagement',
    RECENT_ACTIVITY: '/admin/recent-activity',
    USERS: '/admin/users'
  },
  TUTORIALS: {
    BASE: '/tutorials',
    SEARCH: '/tutorials/search',
    CATEGORIES: '/tutorials/categories'
  }
}

// Local storage keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  TOKEN_EXPIRES: 'token_expires_at',
  USER: 'user'
}

// Default values
export const DEFAULTS = {
  PAGINATION: {
    PAGE: 1,
    LIMIT: 20
  },
  TIME_RANGE: {
    MONTHS: 6
  }
}