import { API_CONFIG } from '@configs/api.config';
import { AUTH_CONFIG } from '@configs/auth/auth.config';
import {
  getToken,
  storeToken,
  removeToken,
  isTokenExpired,
} from '@utils/auth/token-manager';
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';

import { Any } from '@/types';
import { logger } from '@/utils/logger';

const http: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

http.interceptors.request.use(
  async (config) => {
    const token = getToken();

    if (token && !isTokenExpired(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    logger.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`, {
      headers: config.headers,
      data: config.data,
    });

    return config;
  },
  (error: AxiosError) => {
    logger.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response: AxiosResponse) => {
    logger.log(
      `✅ ${response.config.method?.toUpperCase()} ${response.config.url}`,
      {
        status: response.status,
        data: response.data,
      }
    );

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    logger.error(
      `❌ ${originalRequest?.method?.toUpperCase()} ${originalRequest?.url}`,
      {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      }
    );

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const currentToken = getToken();

      if (currentToken && isTokenExpired(currentToken)) {
        logger.log('🔄 Token expired, attempting refresh...');

        try {
          const refreshResponse = await axios.post(
            `${API_CONFIG.BASE_URL}/auth/refresh`,
            {},
            {
              headers: {
                Authorization: `Bearer ${currentToken}`,
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            }
          );

          const newToken = refreshResponse.data.accessToken;
          if (newToken) {
            logger.log('✅ Token refreshed successfully');

            storeToken(newToken);

            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }

            return http(originalRequest);
          }
        } catch (refreshError) {
          logger.error('❌ Token refresh failed:', refreshError);

          removeToken();

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
        logger.log('🚪 No valid token, redirecting to login');
        removeToken();

        if (typeof window !== 'undefined') {
          window.location.href = AUTH_CONFIG.LOGIN_ROUTE;
        }
      }
    }

    const errorMessage = getErrorMessage(error);
    return Promise.reject({
      ...error,
      message: errorMessage,
    });
  }
);

/**
 * Extracts a user-friendly error message from an AxiosError object.
 *
 * This function attempts to parse the error response data to provide a more
 * detailed message. It handles various error formats, including string and
 * object-based messages. If specific message details are available, they are
 * returned. In the absence of such details, it falls back to the Axios error
 * message or a default message.
 *
 * @param error - The AxiosError object from which to extract the message.
 * @returns A string containing the user-friendly error message.
 */

function getErrorMessage(error: AxiosError): string {
  if (error.response?.data) {
    const data = error.response.data as Any;

    if (typeof data === 'string') {
      return data;
    }

    if (data.message) {
      return Array.isArray(data.message)
        ? data.message.join(', ')
        : data.message;
    }

    if (data.error) {
      return data.error;
    }
  }

  if (error.message) {
    return error.message;
  }

  return 'An unexpected error occurred';
}

export default http;

export type { AxiosResponse, AxiosError };
