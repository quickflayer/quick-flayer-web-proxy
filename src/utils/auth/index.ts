import { AUTH_CONFIG } from '@configs/auth/auth.config';
import http from '@lib/http';
import { store } from '@lib/store';
import { logout, setCredentials } from '@redux/auth/auth.slice';
import {
  getToken,
  removeToken,
  isTokenExpired,
} from '@utils/auth/token-manager';

import { Any } from '@/types';
import { logger } from '@/utils/logger';

/**
 * Initializes the authentication state by verifying the stored token.
 *
 * This function retrieves the token from storage, checks its validity,
 * and verifies it with the API. If the token is invalid or API verification
 * fails, it logs the user out and clears the token. On successful verification,
 * it updates the Redux store with user data and the token.
 *
 * @returns {Promise<boolean>} - A promise that resolves to true if
 * initialization is successful, false otherwise.
 */
export const initializeAuth = async (): Promise<boolean> => {
  const token = getToken();

  if (!token || isTokenExpired(token)) {
    logger.log('No valid token found during initialization');
    removeToken();
    return false;
  }

  try {
    logger.log('Verifying token with API...');

    const response = await http.get('/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    store.dispatch(
      setCredentials({
        user: response.data,
        accessToken: token,
      })
    );

    return true;
  } catch (error) {
    logger.error('Auth initialization failed:', error);
    removeToken();
    store.dispatch(logout());
    return false;
  }
};

/**
 * Logs the user out by removing the token from storage and clearing the
 * Redux store. Redirects to the login page.
 */
export const logoutUser = (): void => {
  logger.log('Logging out user from auth-utils');

  removeToken();

  store.dispatch(logout());

  window.location.href = AUTH_CONFIG.LOGIN_ROUTE;
};

/**
 * Checks if a user has the admin role.
 *
 * @param user - The user object to check.
 * @returns {boolean} - True if the user is an admin, false otherwise.
 */
export const isAdmin = (user: Any): boolean => {
  return user?.role === 'admin';
};

/**
 * Sets an auto-logout timer for the user.
 *
 * @returns {NodeJS.Timeout} - The timeout object.
 */
export const setAutoLogoutTimer = (): NodeJS.Timeout => {
  const LOGOUT_TIME = 24 * 60 * 60 * 1000;

  return setTimeout(() => {
    logoutUser();
  }, LOGOUT_TIME);
};
