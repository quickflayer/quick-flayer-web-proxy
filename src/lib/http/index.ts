import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getToken, storeToken, removeToken, isTokenExpired } from '../auth/token-manager';
import { AUTH_CONFIG } from '../auth/auth-config';
import { Any } from '@/types';

// Create axios instance with default configuration
const http: AxiosInstance = axios.create({
  baseURL: AUTH_CONFIG.API_BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add auth token
http.interceptors.request.use(
  async (config) => {
    // Get token from storage (checks both localStorage and cookies)
    const token = getToken();
    
    // Add token to headers if it exists and is valid
    if (token && !isTokenExpired(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request for debugging
    console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`, {
      headers: config.headers,
      data: config.data,
    });
    
    return config;
  },
  (error: AxiosError) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and token refresh
http.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log successful responses
    console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url}`, {
      status: response.status,
      data: response.data,
    });
    
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    
    console.error(`❌ ${originalRequest?.method?.toUpperCase()} ${originalRequest?.url}`, {
      status: error.response?.status,
      message: error.message,
      data: error.response?.data,
    });
    
    // Handle 401 Unauthorized errors (token expired/invalid)
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const currentToken = getToken();
      
      // If token exists but is expired, try to refresh it
      if (currentToken && isTokenExpired(currentToken)) {
        console.log('🔄 Token expired, attempting refresh...');
        
        try {
          // Try to refresh the token
          const refreshResponse = await axios.post(
            `${AUTH_CONFIG.API_BASE_URL}/auth/refresh`,
            {},
            {
              headers: {
                'Authorization': `Bearer ${currentToken}`,
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            }
          );
          
          const newToken = refreshResponse.data.accessToken;
          if (newToken) {
            console.log('✅ Token refreshed successfully');
            
            // Store the new token
            storeToken(newToken);
            
            // Update the original request with new token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            
            // Retry the original request
            return http(originalRequest);
          }
        } catch (refreshError) {
          console.error('❌ Token refresh failed:', refreshError);
          
          // Clear invalid token and redirect to login
          removeToken();
          
          // Redirect to login page
          if (typeof window !== 'undefined') {
            window.location.href = AUTH_CONFIG.LOGIN_ROUTE;
          }
          
          return Promise.reject({
            ...error,
            isRefreshError: true,
            message: 'Session expired. Please login again.',
          });
        }
      } else {
        // No token or token is invalid, clear storage and redirect
        console.log('🚪 No valid token, redirecting to login');
        removeToken();
        
        if (typeof window !== 'undefined') {
          window.location.href = AUTH_CONFIG.LOGIN_ROUTE;
        }
      }
    }
    
    // Handle other HTTP errors
    const errorMessage = getErrorMessage(error);
    return Promise.reject({
      ...error,
      message: errorMessage,
    });
  }
);

// Helper function to extract meaningful error messages
function getErrorMessage(error: AxiosError): string {
  if (error.response?.data) {
    const data = error.response.data as Any;
    
    // Handle different error response formats
    if (typeof data === 'string') {
      return data;
    }
    
    if (data.message) {
      return Array.isArray(data.message) ? data.message.join(', ') : data.message;
    }
    
    if (data.error) {
      return data.error;
    }
  }
  
  // Fallback to axios error message
  if (error.message) {
    return error.message;
  }
  
  // Default error message
  return 'An unexpected error occurred';
}

// Export the configured http client
export default http;

// Export types for use in other files
export type { AxiosResponse, AxiosError };
