import { useAxiosQuery, useAxiosMutation } from './use-axios-query';
import http from '@lib/http';
import { logger } from '@utils/logger';

// Types for user management
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: 'admin' | 'user';
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  role?: 'admin' | 'user';
  isActive?: boolean;
}

export interface UserStatistics {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  adminUsers: number;
  regularUsers: number;
}

/**
 * Hook to fetch all users (admin only)
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
        logger.error('Users fetch failed:', error);
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
        logger.error(`User fetch failed for ID ${userId}:`, error);
      },
    }
  );
}

/**
 * Hook to fetch user statistics (admin only)
 */
export function useUserStatisticsQuery(enabled: boolean = true) {
  return useAxiosQuery(
    ['users', 'statistics'],
    () => http.get<UserStatistics>('/users/statistics'),
    {
      enabled,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      onError: (error) => {
        logger.error('User statistics fetch failed:', error);
      },
    }
  );
}

/**
 * Hook for user creation mutation (admin only)
 */
export function useCreateUserMutation() {
  return useAxiosMutation<User, CreateUserRequest>(
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
  return useAxiosMutation<User, { id: string; updates: UpdateUserRequest }>(
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
 * Hook for toggling user active status (admin only)
 */
export function useToggleUserStatusMutation() {
  return useAxiosMutation<User, string>(
    (userId) => http.patch<User>(`/users/${userId}/toggle-status`),
    {
      onSuccess: (data, variables) => {
        logger.log('User status toggled successfully:', { userId: variables, newStatus: data.isActive });
      },
      onError: (error, variables) => {
        logger.error(`User status toggle failed for ID ${variables}:`, error);
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
