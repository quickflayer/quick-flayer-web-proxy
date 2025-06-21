import { AxiosError } from 'axios';

import { ERROR_MESSAGES, HTTP_STATUS } from '@/constants';
import { Any, TError } from '@/types';
import { logger } from '@/utils/logger';
import { tryCatch } from '@/utils/try-catch';

/**
 * Standardized error handler for API responses
 */
export const handleApiError = (error: unknown): TError => {
  if (error instanceof AxiosError) {
    const status = error.response?.status || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = getErrorMessage(error);

    logger.error('API Error:', {
      status,
      message,
      url: error.config?.url,
      method: error.config?.method,
      data: error.response?.data,
    });

    return {
      message,
      status,
      data: error.response?.data,
    };
  }

  if (error instanceof Error) {
    logger.error('General Error:', error.message, error.stack);
    return {
      message: error.message,
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      data: error,
    };
  }

  logger.error('Unknown Error:', error);
  return {
    message: ERROR_MESSAGES.UNKNOWN_ERROR,
    status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    data: error,
  };
};

/**
 * Extract meaningful error message from AxiosError
 */
export const getErrorMessage = (error: AxiosError): string => {
  // Check for network errors
  if (!error.response) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  const { status, data } = error.response;

  // Handle specific HTTP status codes
  switch (status) {
    case HTTP_STATUS.UNAUTHORIZED:
      return ERROR_MESSAGES.UNAUTHORIZED;
    case HTTP_STATUS.FORBIDDEN:
      return ERROR_MESSAGES.UNAUTHORIZED;
    case HTTP_STATUS.NOT_FOUND:
      return ERROR_MESSAGES.NOT_FOUND;
    case HTTP_STATUS.UNPROCESSABLE_ENTITY:
      return ERROR_MESSAGES.VALIDATION_ERROR;
    case HTTP_STATUS.INTERNAL_SERVER_ERROR:
    case HTTP_STATUS.BAD_GATEWAY:
    case HTTP_STATUS.SERVICE_UNAVAILABLE:
      return ERROR_MESSAGES.SERVER_ERROR;
  }

  // Try to extract message from response data
  if (data && typeof data === 'object') {
    const responseData = data as Any;

    if (typeof responseData.message === 'string') {
      return responseData.message;
    }

    if (Array.isArray(responseData.message)) {
      return responseData.message.join(', ');
    }

    if (typeof responseData.error === 'string') {
      return responseData.error;
    }

    if (typeof responseData.detail === 'string') {
      return responseData.detail;
    }
  }

  // Fallback to error message or generic message
  return error.message || ERROR_MESSAGES.UNKNOWN_ERROR;
};

/**
 * Handle authentication errors specifically
 */
export const handleAuthError = (error: unknown): TError => {
  const apiError = handleApiError(error);

  // Override message for auth-specific errors
  if (apiError.status === HTTP_STATUS.UNAUTHORIZED) {
    return {
      ...apiError,
      message: ERROR_MESSAGES.SESSION_EXPIRED,
    };
  }

  return apiError;
};

/**
 * Handle validation errors
 */
export const handleValidationError = (error: unknown): string[] => {
  if (
    error instanceof AxiosError &&
    error.response?.status === HTTP_STATUS.UNPROCESSABLE_ENTITY
  ) {
    const data = error.response.data as Any;

    if (Array.isArray(data.message)) {
      return data.message;
    }

    if (typeof data.message === 'string') {
      return [data.message];
    }

    if (data.errors && Array.isArray(data.errors)) {
      return data.errors.map((err: Any) => err.message || String(err));
    }
  }

  return [ERROR_MESSAGES.VALIDATION_ERROR];
};

/**
 * Safe error logging that won't throw
 */
export const safeLog = (
  level: 'error' | 'warn' | 'log' | 'debug',
  message: string,
  ...args: Any[]
) => {
  try {
    logger[level](message, ...args);
  } catch (logError) {
    // Fallback to console if logger fails
    logger[level](`[LOGGER ERROR] ${message}`, ...args, logError);
  }
};

/**
 * Create a standardized error object
 */
export const createError = (
  message: string,
  status: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  data?: Any
): TError => ({
  message,
  status,
  data,
});

/**
 * Check if error is a network error
 */
export const isNetworkError = (error: unknown): boolean => {
  return error instanceof AxiosError && !error.response;
};

/**
 * Check if error is an authentication error
 */
export const isAuthError = (error: unknown): boolean => {
  return (
    error instanceof AxiosError &&
    (error.response?.status === HTTP_STATUS.UNAUTHORIZED ||
      error.response?.status === HTTP_STATUS.FORBIDDEN)
  );
};

/**
 * Check if error is a validation error
 */
export const isValidationError = (error: unknown): boolean => {
  return (
    error instanceof AxiosError &&
    error.response?.status === HTTP_STATUS.UNPROCESSABLE_ENTITY
  );
};

/**
 * Check if error is a server error
 */
export const isServerError = (error: unknown): boolean => {
  return (
    error instanceof AxiosError &&
    error.response?.status !== undefined &&
    error.response.status >= 500
  );
};

/**
 * Retry function with exponential backoff
 */
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const result = await tryCatch({
      fn,
      fallbackError: `Retry attempt ${attempt + 1} failed`,
    });

    if (result.success) {
      return result.data as T;
    }

    lastError = result.error.data;

    if (attempt === maxRetries) {
      break;
    }

    // Don't retry on client errors (4xx) except 429 (rate limit)
    if (
      lastError instanceof AxiosError &&
      lastError.response?.status !== undefined &&
      lastError.response.status >= 400 &&
      lastError.response.status < 500 &&
      lastError.response.status !== 429
    ) {
      break;
    }

    const delay = baseDelay * Math.pow(2, attempt);
    logger.log(
      `Retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries + 1})`
    );
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  throw lastError;
};

/**
 * Timeout wrapper for promises
 */
export const withTimeout = <T>(
  promise: Promise<T>,
  timeoutMs: number,
  timeoutMessage: string = 'Operation timed out'
): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs);
    }),
  ]);
};

/**
 * Returns a string representation of the given error, or a fallback error message if the given error is not an instance of the Error class.
 * @param error The error to be converted to a string
 * @param fallbackError The fallback error message to be returned if the given error is not an instance of the Error class
 * @returns A string representation of the given error, or the fallback error message if the given error is not an instance of the Error class
 */
export const unknownError = (
  error: unknown,
  fallbackError?: string
): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (fallbackError) {
    return fallbackError;
  }
  return ERROR_MESSAGES.UNKNOWN_ERROR;
};
