// Token storage and management utilities

// Store token in both localStorage and cookies for SSR compatibility
export const storeToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    // Store in localStorage for client-side access
    localStorage.setItem('auth_token', token);

    // Store in cookie for middleware access
    const expires = new Date();
    expires.setTime(expires.getTime() + (24 * 60 * 60 * 1000)); // 24 hours

    document.cookie = `auth_token=${token}; expires=${expires.toUTCString()}; path=/; SameSite=Lax; Secure=${window.location.protocol === 'https:'}`;
  }
};

// Retrieve token from localStorage with cookie fallback
export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    // Try localStorage first
    const localToken = localStorage.getItem('auth_token');
    if (localToken) {
      return localToken;
    }

    // Fallback to cookie
    const cookieToken = getCookieToken();
    if (cookieToken) {
      // Sync back to localStorage if found in cookie
      localStorage.setItem('auth_token', cookieToken);
      return cookieToken;
    }
  }
  return null;
};

// Get token from cookie (for client-side cookie reading)
export const getCookieToken = (): string | null => {
  if (typeof window !== 'undefined') {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'auth_token') {
        return value;
      }
    }
  }
  return null;
};

// Remove token from both localStorage and cookies
export const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    // Remove from localStorage
    localStorage.removeItem('auth_token');

    // Remove from cookie by setting expired date
    document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax';
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
    console.error('Error parsing token:', error);
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
    console.error('Error extracting user role from token:', error);
    return null;
  }
};
