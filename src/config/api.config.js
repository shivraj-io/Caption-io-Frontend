// NEW FILE - Centralized API configuration
export const API_CONFIG = {
  BASE_URL: `${import.meta.env.VITE_API_URL}/api` || "http://localhost:5000/api",
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
      GENERATE_CAPTION: '/api/posts/generate-caption' // ✅ This should be called
    }
  },
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json'
  }
};