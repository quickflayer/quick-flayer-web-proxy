export const AUTH_CONFIG = {
  LOGIN_ENDPOINT: '/auth/login',
  REGISTER_ENDPOINT: '/auth/register',
  PROFILE_ENDPOINT: '/auth/profile',
  VERIFY_ENDPOINT: '/auth/verify',

  // ** Token settings
  TOKEN_EXPIRY: 24 * 60 * 60 * 1000,
  REFRESH_BEFORE_EXPIRY: 5 * 60 * 1000,

  // ** Routes
  LOGIN_ROUTE: '/login',
  DASHBOARD_ROUTE: '/dashboard',
  UNAUTHORIZED_ROUTE: '/unauthorized',

  // ** Access control
  ADMIN_ROLE: 'admin',
  USER_ROLE: 'user',

  // ** Session
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000,

  // ** Cookie names
  TOKEN_COOKIE_NAME: 'auth_token',
  REFRESH_TOKEN_COOKIE_NAME: 'refresh_token',

  // ** Local storage keys
  TOKEN_STORAGE_KEY: 'auth_token',
};
