// NEW FILE - Centralized API configuration
export const API_CONFIG = {
  // Use Vite-provided API host if available. Endpoints below include `/api` so
  // BASE_URL should be the host only to avoid double `/api` when building full URLs.
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:5000",

  ENDPOINTS: {
    AUTH: {
      REGISTER: '/api/auth/register',
      LOGIN: '/api/auth/login',
      LOGOUT: '/api/auth/logout',
      ME: '/api/auth/me'
    },
    POSTS: {
      CREATE: '/api/posts/create',
      GET_ALL: '/api/posts',
      GET_BY_ID: (id) => `/api/posts/${id}`,
      DELETE: (id) => `/api/posts/${id}`,
      GENERATE_CAPTION: '/api/posts/generate-caption'
    }
  },

  TIMEOUT: 10000,

  HEADERS: {
    'Content-Type': 'application/json'
  }
};