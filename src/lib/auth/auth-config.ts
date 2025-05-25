// Authentication configuration settings

export const AUTH_CONFIG = {
  // API endpoints
  API_BASE_URL: 'http://localhost:3001',
  LOGIN_ENDPOINT: '/auth/login',
  REGISTER_ENDPOINT: '/auth/register',
  PROFILE_ENDPOINT: '/auth/profile',
  VERIFY_ENDPOINT: '/auth/verify',
  
  // Token settings
  TOKEN_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  REFRESH_BEFORE_EXPIRY: 5 * 60 * 1000, // 5 minutes before expiry
  
  // Routes
  LOGIN_ROUTE: '/login',
  DASHBOARD_ROUTE: '/dashboard',
  UNAUTHORIZED_ROUTE: '/unauthorized',
  
  // Access control
  ADMIN_ROLE: 'admin',
  USER_ROLE: 'user',
  
  // Session
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours inactivity timeout
};
