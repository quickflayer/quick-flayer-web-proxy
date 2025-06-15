import { AUTH_CONFIG } from '@/configs/auth/auth.config';
import { STORAGE_KEYS, COOKIE_NAMES } from '@/constants';
import { logger } from '@/utils/logger';

/**
 * Stores an authentication token in both localStorage and a cookie.
 *
 * This ensures that the token is accessible to both the client-side and
 * middleware code. The token is stored for 24 hours to match the default
 * expiration time of the token.
 *
 * @param token The authentication token to store.
 */
export const storeToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);

    const expires = new Date();
    expires.setTime(expires.getTime() + AUTH_CONFIG.TOKEN_EXPIRY);

    document.cookie = `${COOKIE_NAMES.AUTH_TOKEN}=${token}; expires=${expires.toUTCString()}; path=/; SameSite=Lax; Secure=${window.location.protocol === 'https:'}`;
  }
};

/**
 * Retrieves the authentication token from either the client-side localStorage
 * or a cookie. The value from localStorage is given priority.
 *
 * @returns The authentication token, or null if not found.
 */
export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    const localToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (localToken) {
      return localToken;
    }

    const cookieToken = getCookieToken();
    if (cookieToken) {
      return cookieToken;
    }
  }
  return null;
};

/**
 * Retrieves the authentication token from a cookie.
 *
 * @returns The authentication token, or null if not found.
 */
export const getCookieToken = (): string | null => {
  if (typeof window !== 'undefined') {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === COOKIE_NAMES.AUTH_TOKEN) {
        return value;
      }
    }
  }
  return null;
};

/**
 * Removes the authentication token from both the client-side localStorage
 * and the cookie. This will cause the user to be logged out.
 */
export const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);

    document.cookie = `${COOKIE_NAMES.AUTH_TOKEN}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
  }
};

/**
 * Checks if an authentication token has expired.
 *
 * @param token The authentication token to check.
 * @returns true if the token has expired, false otherwise.
 */
export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    logger.error('Error parsing token:', error);
    return true;
  }
};

/**
 * Extracts the user role from an authentication token.
 *
 * @param token The authentication token to extract the role from.
 * @returns The user role, or null if not found.
 */
export const getUserRoleFromToken = (token: string): string | null => {
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || null;
  } catch (error) {
    logger.error('Error extracting user role from token:', error);
    return null;
  }
};
