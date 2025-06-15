import { useEffect, useState } from 'react';

import { AUTH_CONFIG } from '@configs/auth/auth.config';
import {
  storeToken,
  removeToken,
  getToken,
  isTokenExpired,
} from '@utils/auth/token-manager';
import { useSelector, useDispatch } from 'react-redux';

import { useRouter } from 'next/navigation';

import { RootState } from '@lib/store';
import { setCredentials, logout, setError } from '@redux/auth/auth.slice';

import { Any, TError } from '@/types';
import { logger } from '@/utils/logger';

import { useLoginMutation, useProfileQuery } from './useAuthQueries';

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const loginMutation = useLoginMutation();
  const { user, isAuthenticated, error } = useSelector(
    (state: RootState) => state.auth
  );
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const { refetch, isLoading: isProfileLoading } =
    useProfileQuery(isAuthenticated);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = getToken();

        if (token && !isTokenExpired(token)) {
          logger.log('Valid token found, initializing auth state');

          dispatch(setCredentials({ user: null, accessToken: token }));

          try {
            await refetch();
            logger.log('Profile fetched successfully');
          } catch (profileError) {
            logger.error('Error fetching profile:', profileError);
            removeToken();
            dispatch(logout());
          }
        } else {
          logger.log('No valid token found, clearing auth state');
          removeToken();
          dispatch(logout());
        }
      } catch (error) {
        logger.error('Error initializing auth:', error);
        removeToken();
        dispatch(logout());
      } finally {
        setIsCheckingAuth(false);
      }
    };

    initAuth();
  }, [dispatch, refetch]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const result = await loginMutation.mutateAsync({ email, password });

      storeToken(result.accessToken);

      dispatch(setCredentials(result));

      logger.log('Login successful, redirecting to dashboard');
      router.push(AUTH_CONFIG.DASHBOARD_ROUTE);
      return true;
    } catch (error: TError) {
      logger.error('Login failed:', error);
      dispatch(setError(error.message || 'Login failed'));
      return false;
    }
  };

  // Handle logout
  const handleLogout = () => {
    console.log('Logging out user');

    // Remove token from both localStorage and cookies
    removeToken();

    // Clear Redux state
    dispatch(logout());

    // Redirect to login
    router.push(AUTH_CONFIG.LOGIN_ROUTE);
  };

  // Check if user is admin
  const isAdmin = () => user?.role === AUTH_CONFIG.ADMIN_ROLE;

  return {
    user,
    isAuthenticated,
    isCheckingAuth,
    isLoading: loginMutation.isLoading,
    isProfileLoading,
    error,
    login: handleLogin,
    logout: handleLogout,
    isAdmin,
    refetch,
  };
};
