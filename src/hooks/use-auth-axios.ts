import { useEffect, useState, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { useRouter } from 'next/navigation';

import { AUTH_CONFIG } from '@configs/auth/auth.config';
import { RootState } from '@lib/store';
import AuthService, { LoginRequest, User } from '@redux/auth/auth.service';
import {
  setCredentials,
  logout,
  setError,
  clearError,
} from '@redux/auth/auth.slice';
import {
  storeToken,
  removeToken,
  getToken,
  isTokenExpired,
} from '@utils/auth/token-manager';
import { logger } from '@utils/logger';

import { tryCatch } from '@/utils/try-catch';

export const useAuthAxios = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isAuthenticated, error } = useSelector(
    (state: RootState) => state.auth
  );

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);

  const initializeAuth = useCallback(async () => {
    await tryCatch({
      fn: async () => {
        const token = getToken();

        if (token && !isTokenExpired(token)) {
          logger.log('Valid token found, initializing auth state');

          // Set token in Redux state first
          dispatch(setCredentials({ user: null, accessToken: token }));

          const profileResult = await tryCatch({
            fn: async () => {
              setIsProfileLoading(true);
              const userData = await AuthService.getProfile();
              dispatch(setCredentials({ user: userData, accessToken: token }));
              logger.log('Profile fetched successfully');
            },
            logger: logger.error,
            fallbackError: 'Failed to fetch profile',
            finally: () => setIsProfileLoading(false),
          });

          if (!profileResult.success) {
            removeToken();
            dispatch(logout());
          }
        } else {
          logger.log('No valid token found, clearing auth state');
          removeToken();
          dispatch(logout());
        }
      },
      logger: logger.error,
      fallbackError: 'Error initializing auth',
      finally: () => setIsCheckingAuth(false),
    });
  }, [dispatch]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      setIsLoginLoading(true);

      const result = await tryCatch<boolean>({
        fn: async () => {
          dispatch(clearError());

          const credentials: LoginRequest = { email, password };
          const loginResult = await AuthService.login(credentials);

          storeToken(loginResult.accessToken);

          dispatch(setCredentials(loginResult));

          logger.log('Login successful, redirecting to dashboard');
          router.push(AUTH_CONFIG.DASHBOARD_ROUTE);

          return true;
        },
        logger: logger.error,
        fallbackError: 'Login failed',
        finally: () => setIsLoginLoading(false),
      });

      if (result.success) {
        return result.data;
      } else {
        dispatch(setError(result.error.message));
        return false;
      }
    },
    [dispatch, router]
  );

  // Logout function
  const handleLogout = useCallback(async () => {
    await tryCatch({
      fn: async () => {
        logger.log('Logging out user');

        // Call logout API (optional)
        await AuthService.logout();
      },
      logger: logger.error,
      fallbackError: 'Logout API call failed',
      finally: () => {
        // Remove token from both localStorage and cookies
        removeToken();

        // Clear Redux state
        dispatch(logout());

        // Redirect to login
        router.push(AUTH_CONFIG.LOGIN_ROUTE);
      },
    });
  }, [dispatch, router]);

  // Refresh user profile
  const refreshProfile = useCallback(async (): Promise<User | null> => {
    if (!isAuthenticated) {
      return null;
    }

    setIsProfileLoading(true);

    const result = await tryCatch({
      fn: async () => {
        const userData = await AuthService.getProfile();

        // Update Redux state with fresh user data
        const currentToken = getToken();
        if (currentToken) {
          dispatch(
            setCredentials({ user: userData, accessToken: currentToken })
          );
        }

        return userData;
      },
      logger: logger.error,
      fallbackError: 'Failed to refresh profile',
      finally: () => setIsProfileLoading(false),
    });

    if (result.success) {
      return result.data as User;
    } else {
      dispatch(setError(result.error.message));
      return null;
    }
  }, [isAuthenticated, dispatch]);

  // Update profile
  const updateProfile = useCallback(
    async (updates: Partial<User>): Promise<boolean> => {
      if (!isAuthenticated) {
        return false;
      }

      setIsProfileLoading(true);

      const result = await tryCatch({
        fn: async () => {
          const updatedUser = await AuthService.updateProfile(updates);

          // Update Redux state with updated user data
          const currentToken = getToken();
          if (currentToken) {
            dispatch(
              setCredentials({ user: updatedUser, accessToken: currentToken })
            );
          }

          return true;
        },
        logger: logger.error,
        fallbackError: 'Failed to update profile',
        finally: () => setIsProfileLoading(false),
      });

      if (result.success) {
        return result.data as boolean;
      } else {
        dispatch(setError(result.error.message));
        return false;
      }
    },
    [isAuthenticated, dispatch]
  );

  // Change password
  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string): Promise<boolean> => {
      if (!isAuthenticated) {
        return false;
      }

      const result = await tryCatch({
        fn: async () => {
          await AuthService.changePassword(currentPassword, newPassword);
          return true;
        },
        logger: logger.error,
        fallbackError: 'Failed to change password',
      });

      if (result.success) {
        return result.data as boolean;
      } else {
        dispatch(setError(result.error.message));
        return false;
      }
    },
    [isAuthenticated, dispatch]
  );

  // Check if user is admin
  const isAdmin = useCallback((): boolean => {
    return AuthService.isAdmin(user);
  }, [user]);

  // Check if user has specific role
  const hasRole = useCallback(
    (role: string): boolean => {
      return AuthService.hasRole(user, role);
    },
    [user]
  );

  // Clear error
  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    // State
    user,
    isAuthenticated,
    isCheckingAuth,
    isLoginLoading,
    isProfileLoading,
    error,

    // Actions
    login,
    logout: handleLogout,
    refreshProfile,
    updateProfile,
    changePassword,
    clearError: clearAuthError,

    // Utilities
    isAdmin,
    hasRole,

    // Re-initialize auth (useful for manual refresh)
    reinitialize: initializeAuth,
  };
};
