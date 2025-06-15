import http from '@lib/http';
import {
  LoginRequest,
  RegisterRequest,
  User,
  AuthResponse,
} from '@redux/auth/auth.service';
import { logger } from '@utils/logger';

import { useAxiosQuery, useAxiosMutation } from './use-axios-query';

/**
 * Hook to fetch user profile
 */
export function useProfileQuery(enabled: boolean = true) {
  return useAxiosQuery(
    ['auth', 'profile'],
    () => http.get<User>('/auth/profile'),
    {
      enabled,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: true,
      onError: (error) => {
        logger.error('Profile fetch failed:', error);
      },
    }
  );
}

/**
 * Hook for login mutation
 */
export function useLoginMutation() {
  return useAxiosMutation<AuthResponse, LoginRequest>(
    (credentials) => http.post<AuthResponse>('/auth/login', credentials),
    {
      onSuccess: (data, variables) => {
        logger.log('Login successful for:', variables.email);
      },
      onError: (error, variables) => {
        logger.error('Login failed for:', variables.email, error);
      },
    }
  );
}

/**
 * Hook for registration mutation
 */
export function useRegisterMutation() {
  return useAxiosMutation<AuthResponse, RegisterRequest>(
    (userData) => http.post<AuthResponse>('/auth/register', userData),
    {
      onSuccess: (data, variables) => {
        logger.log('Registration successful for:', variables.email);
      },
      onError: (error, variables) => {
        logger.error('Registration failed for:', variables.email, error);
      },
    }
  );
}

/**
 * Hook for token verification mutation
 */
export function useVerifyTokenMutation() {
  return useAxiosMutation<{ valid: boolean; user?: User }, { token: string }>(
    (tokenData) =>
      http.post<{ valid: boolean; user?: User }>('/auth/verify', tokenData),
    {
      onSuccess: (data) => {
        logger.log('Token verification result:', data.valid);
      },
      onError: (error) => {
        logger.error('Token verification failed:', error);
      },
    }
  );
}

/**
 * Hook for profile update mutation
 */
export function useUpdateProfileMutation() {
  return useAxiosMutation<User, Partial<User>>(
    (updates) => http.patch<User>('/auth/profile', updates),
    {
      onSuccess: (data) => {
        logger.log('Profile updated successfully:', data);
      },
      onError: (error) => {
        logger.error('Profile update failed:', error);
      },
    }
  );
}

/**
 * Hook for password change mutation
 */
export function useChangePasswordMutation() {
  return useAxiosMutation<
    void,
    { currentPassword: string; newPassword: string }
  >((passwordData) => http.post<void>('/auth/change-password', passwordData), {
    onSuccess: () => {
      logger.log('Password changed successfully');
    },
    onError: (error) => {
      logger.error('Password change failed:', error);
    },
  });
}

/**
 * Hook for password reset request mutation
 */
export function useRequestPasswordResetMutation() {
  return useAxiosMutation<void, { email: string }>(
    (emailData) => http.post<void>('/auth/forgot-password', emailData),
    {
      onSuccess: (data, variables) => {
        logger.log('Password reset email sent to:', variables.email);
      },
      onError: (error, variables) => {
        logger.error(
          'Password reset request failed for:',
          variables.email,
          error
        );
      },
    }
  );
}

/**
 * Hook for password reset mutation
 */
export function useResetPasswordMutation() {
  return useAxiosMutation<void, { token: string; newPassword: string }>(
    (resetData) => http.post<void>('/auth/reset-password', resetData),
    {
      /**
       * Callback function executed when the password reset process succeeds.
       * Logs a success message indicating the completion of the password reset.
       */
      onSuccess: () => {
        logger.log('Password reset successful');

        /**
         * Callback function executed when the password reset process fails.
         * Logs an error message with the provided error details.
         *
         * @param {AxiosError} error - The error object containing details of the failure.
         */

        /*******  27ecb636-0898-4853-825f-91e40b682841  *******/
      },

      onError: (error) => {
        logger.error('Password reset failed:', error);
      },
    }
  );
}

/**
 * Hook for logout mutation
 */
export function useLogoutMutation() {
  return useAxiosMutation<void, void>(() => http.post<void>('/auth/logout'), {
    /**
     * Callback function executed when the logout API call succeeds.
     * Logs a success message indicating the completion of the logout process.
     */
    onSuccess: () => {
      logger.log('Logout API call successful');
    },
    onError: (error) => {
      logger.error('Logout API call failed:', error);
      // Don't throw error as local logout should still proceed
    },
  });
}

/**
 * Hook for token refresh mutation
 */
export function useRefreshTokenMutation() {
  return useAxiosMutation<AuthResponse, void>(
    () => http.post<AuthResponse>('/auth/refresh'),
    {
      /**
       * Callback function executed when the token refresh operation is successful.
       * Logs a success message indicating the completion of the token refresh process.
       *
       * @param _data - The data returned from the successful token refresh operation.
       */
      onSuccess: (_data) => {
        logger.log('Token refreshed successfully');
      },
      /**
       * Callback function executed when the token refresh operation fails.
       * Logs an error message indicating the failure of the token refresh process.
       *
       * @param {AxiosError} error - The error object containing details of the failure.
       */
      onError: (error) => {
        logger.error('Token refresh failed:', error);
      },
    }
  );
}

/**
 * Hook to fetch user list (admin only)
 */
export function useUsersQuery(enabled: boolean = true) {
  return useAxiosQuery(['users', 'list'], () => http.get<User[]>('/users'), {
    enabled,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: false,
    onError: (error) => {
      logger.error('Users fetch failed:', error);
    },
  });
}

/**
 * Hook to fetch specific user by ID (admin only)
 */
export function useUserQuery(userId: string, enabled: boolean = true) {
  return useAxiosQuery(
    ['users', userId],
    () => http.get<User>(`/users/${userId}`),
    {
      enabled: enabled && !!userId,
      staleTime: 5 * 60 * 1000, // 5 minutes
      onError: (error) => {
        logger.error(`User fetch failed for ID ${userId}:`, error);
      },
    }
  );
}

/**
 * Hook for user creation mutation (admin only)
 */
export function useCreateUserMutation() {
  return useAxiosMutation<User, Partial<User>>(
    (userData) => http.post<User>('/users', userData),
    {
      onSuccess: (data, _variables) => {
        logger.log('User created successfully:', data);
      },
      onError: (error, _variables) => {
        logger.error('User creation failed:', error);
      },
    }
  );
}

/**
 * Hook for user update mutation (admin only)
 */
export function useUpdateUserMutation() {
  return useAxiosMutation<User, { id: string; updates: Partial<User> }>(
    ({ id, updates }) => http.patch<User>(`/users/${id}`, updates),
    {
      onSuccess: (data, _variables) => {
        logger.log('User updated successfully:', data);
      },
      onError: (error, variables) => {
        logger.error(`User update failed for ID ${variables.id}:`, error);
      },
    }
  );
}

/**
 * Hook for user deletion mutation (admin only)
 */
export function useDeleteUserMutation() {
  return useAxiosMutation<void, string>(
    (userId) => http.delete<void>(`/users/${userId}`),
    {
      onSuccess: (_data, variables) => {
        logger.log('User deleted successfully:', variables);
      },
      onError: (error, variables) => {
        logger.error(`User deletion failed for ID ${variables}:`, error);
      },
    }
  );
}
