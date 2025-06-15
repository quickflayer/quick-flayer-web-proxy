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
import { logger } from '@utils/logger';
import { tryCatch } from '@utils/try-catch';

import { useLoginMutation, useProfileQuery } from './use-auth-queries';

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
    /**
     * Initializes the authentication state.
     *
     * 1. Checks if a valid token exists
     * 2. If token is valid, sets the credentials and fetches the user profile
     * 3. If profile fetch fails, clears the auth state
     * 4. If no valid token exists, clears the auth state
     * 5. Handles errors and sets checkingAuth to false in the finally block
     */
    const initAuth = async () => {
      await tryCatch({
        fn: async () => {
          const token = getToken();

          if (token && !isTokenExpired(token)) {
            logger.log('Valid token found, initializing auth state');

            dispatch(setCredentials({ user: null, accessToken: token }));

            const profileResult = await tryCatch({
              fn: async () => {
                await refetch();
                logger.log('Profile fetched successfully');
              },
              logger: logger.error,
              fallbackError: 'Error fetching profile',
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
    };

    initAuth();
  }, [dispatch, refetch]);

  /**
   * Logs in a user with the given email and password, and redirects to the
   * dashboard route if successful.
   *
   * @param {string} email - The user's email
   * @param {string} password - The user's password
   * @returns {boolean} Whether the login was successful
   */
  /*******  e148dd21-047b-46df-a3de-689ad786028d  *******/
  const handleLogin = async (email: string, password: string) => {
    const result = await tryCatch({
      fn: async () => {
        const loginResult = await loginMutation.mutateAsync({
          email,
          password,
        });
        storeToken(loginResult.accessToken);
        dispatch(setCredentials(loginResult));
        logger.log('Login successful, redirecting to dashboard');
        router.push(AUTH_CONFIG.DASHBOARD_ROUTE);
        return true;
      },
      logger: logger.error,
      fallbackError: 'Login failed',
    });

    if (result.success) {
      return result.data;
    } else {
      dispatch(setError(result.error.message));
      return false;
    }
  };

  /**
   * Logs out the user by removing the token from both localStorage and cookies,
   * clearing the Redux state, and redirecting to the login route.
   */
  const handleLogout = () => {
    logger.log('Logging out user');

    removeToken();

    dispatch(logout());

    router.push(AUTH_CONFIG.LOGIN_ROUTE);
  };

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
