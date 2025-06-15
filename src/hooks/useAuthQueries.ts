import { useAxiosQuery, useAxiosMutation } from './useAxiosQuery';
import AuthService, { LoginRequest, RegisterRequest, User, AuthResponse } from '../redux/auth/auth.service';
import http from '../lib/http';

// Auth-specific query hooks using the custom Axios implementation

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
        console.error('Profile fetch failed:', error);
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
        console.log('Login successful for:', variables.email);
      },
      onError: (error, variables) => {
        console.error('Login failed for:', variables.email, error);
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
        console.log('Registration successful for:', variables.email);
      },
      onError: (error, variables) => {
        console.error('Registration failed for:', variables.email, error);
      },
    }
  );
}

/**
 * Hook for token verification mutation
 */
export function useVerifyTokenMutation() {
  return useAxiosMutation<{ valid: boolean; user?: User }, { token: string }>(
    (tokenData) => http.post<{ valid: boolean; user?: User }>('/auth/verify', tokenData),
    {
      onSuccess: (data, variables) => {
        console.log('Token verification result:', data.valid);
      },
      onError: (error, variables) => {
        console.error('Token verification failed:', error);
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
      onSuccess: (data, variables) => {
        console.log('Profile updated successfully:', data);
      },
      onError: (error, variables) => {
        console.error('Profile update failed:', error);
      },
    }
  );
}

/**
 * Hook for password change mutation
 */
export function useChangePasswordMutation() {
  return useAxiosMutation<void, { currentPassword: string; newPassword: string }>(
    (passwordData) => http.post<void>('/auth/change-password', passwordData),
    {
      onSuccess: (data, variables) => {
        console.log('Password changed successfully');
      },
      onError: (error, variables) => {
        console.error('Password change failed:', error);
      },
    }
  );
}

/**
 * Hook for password reset request mutation
 */
export function useRequestPasswordResetMutation() {
  return useAxiosMutation<void, { email: string }>(
    (emailData) => http.post<void>('/auth/forgot-password', emailData),
    {
      onSuccess: (data, variables) => {
        console.log('Password reset email sent to:', variables.email);
      },
      onError: (error, variables) => {
        console.error('Password reset request failed for:', variables.email, error);
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
      onSuccess: (data, variables) => {
        console.log('Password reset successful');
      },
      onError: (error, variables) => {
        console.error('Password reset failed:', error);
      },
    }
  );
}

/**
 * Hook for logout mutation
 */
export function useLogoutMutation() {
  return useAxiosMutation<void, void>(
    () => http.post<void>('/auth/logout'),
    {
      onSuccess: () => {
        console.log('Logout API call successful');
      },
      onError: (error) => {
        console.error('Logout API call failed:', error);
        // Don't throw error as local logout should still proceed
      },
    }
  );
}

/**
 * Hook for token refresh mutation
 */
export function useRefreshTokenMutation() {
  return useAxiosMutation<AuthResponse, void>(
    () => http.post<AuthResponse>('/auth/refresh'),
    {
      onSuccess: (data) => {
        console.log('Token refreshed successfully');
      },
      onError: (error) => {
        console.error('Token refresh failed:', error);
      },
    }
  );
}

/**
 * Hook to fetch user list (admin only)
 */
export function useUsersQuery(enabled: boolean = true) {
  return useAxiosQuery(
    ['users', 'list'],
    () => http.get<User[]>('/users'),
    {
      enabled,
      staleTime: 2 * 60 * 1000, // 2 minutes
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.error('Users fetch failed:', error);
      },
    }
  );
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
        console.error(`User fetch failed for ID ${userId}:`, error);
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
      onSuccess: (data, variables) => {
        console.log('User created successfully:', data);
      },
      onError: (error, variables) => {
        console.error('User creation failed:', error);
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
      onSuccess: (data, variables) => {
        console.log('User updated successfully:', data);
      },
      onError: (error, variables) => {
        console.error(`User update failed for ID ${variables.id}:`, error);
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
      onSuccess: (data, variables) => {
        console.log('User deleted successfully:', variables);
      },
      onError: (error, variables) => {
        console.error(`User deletion failed for ID ${variables}:`, error);
      },
    }
  );
}
