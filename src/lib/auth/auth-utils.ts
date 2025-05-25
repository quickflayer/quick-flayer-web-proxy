import { getToken, removeToken, isTokenExpired } from './token-manager';
import { store } from '../store/store';
import { logout, setCredentials } from '../store/slices/auth-slice';

// Initialize auth state from stored token
export const initializeAuth = async (): Promise<boolean> => {
  const token = getToken();
  
  if (!token || isTokenExpired(token)) {
    removeToken();
    return false;
  }
  
  try {
    // Verify token with the API
    const response = await fetch('http://localhost:3001/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Token validation failed');
    }
    
    const userData = await response.json();
    
    // Update Redux store with user data and token
    store.dispatch(setCredentials({
      user: userData,
      accessToken: token,
    }));
    
    return true;
  } catch (error) {
    console.error('Auth initialization failed:', error);
    removeToken();
    store.dispatch(logout());
    return false;
  }
};

// Handle user logout
export const logoutUser = (): void => {
  removeToken();
  store.dispatch(logout());
  // Redirect to login page
  window.location.href = '/login';
};

// Check if user has admin role
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isAdmin = (user: any): boolean => {
  return user?.role === 'admin';
};

// Set auto logout timer
export const setAutoLogoutTimer = (): NodeJS.Timeout => {
  const LOGOUT_TIME = 24 * 60 * 60 * 1000; // 24 hours
  
  return setTimeout(() => {
    logoutUser();
  }, LOGOUT_TIME);
};
