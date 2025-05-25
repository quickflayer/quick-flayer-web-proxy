// Token storage and management utilities

// Store token in localStorage (for client-side only)
export const storeToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
};

// Retrieve token from localStorage (for client-side only)
export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

// Remove token from localStorage (for client-side only)
export const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
};

// Check if token is expired
export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;
  
  try {
    // Get the payload part of the JWT token
    const payload = JSON.parse(atob(token.split('.')[1]));
    // Check if the token has expired
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

// Extract user role from token
export const getUserRoleFromToken = (token: string): string | null => {
  if (!token) return null;
  
  try {
    // Get the payload part of the JWT token
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || null;
  } catch (error) {
    return null;
  }
};
