import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '../lib/store/store';
import { useLoginMutation, useGetProfileQuery } from '../lib/api/auth-api';
import { setCredentials, logout, setError } from '../lib/store/slices/auth-slice';
import { storeToken, removeToken, getToken, isTokenExpired } from '../lib/auth/token-manager';
import { AUTH_CONFIG } from '../lib/auth/auth-config';

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const { user, isAuthenticated, error } = useSelector((state: RootState) => state.auth);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Auto-fetch profile when authenticated
  const { data: profileData, refetch } = useGetProfileQuery(undefined, {
    skip: !isAuthenticated,
  });

  // Initialize auth state from token
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Use the enhanced getToken function that checks both localStorage and cookies
        const token = getToken();

        if (token && !isTokenExpired(token)) {
          console.log('Valid token found, initializing auth state');

          // Token exists and is valid, dispatch credentials before fetch
          // This avoids dependency cycle with profileData
          dispatch(setCredentials({ user: null, accessToken: token }));

          try {
            // Now fetch the profile to get user data
            await refetch();
            console.log('Profile fetched successfully');
          } catch (profileError) {
            console.error('Error fetching profile:', profileError);
            removeToken();
            dispatch(logout());
          }
        } else {
          console.log('No valid token found, clearing auth state');
          // No valid token found
          removeToken();
          dispatch(logout());
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Token invalid or other error
        removeToken();
        dispatch(logout());
      } finally {
        setIsCheckingAuth(false);
      }
    };

    initAuth();
  }, [dispatch, refetch]); // Remove profileData dependency to avoid infinite loop

  // Handle login
  const handleLogin = async (email: string, password: string) => {
    try {
      const result = await login({ email, password }).unwrap();

      // Store token in both localStorage and cookies
      storeToken(result.accessToken);

      // Update Redux state
      dispatch(setCredentials(result));

      console.log('Login successful, redirecting to dashboard');
      router.push(AUTH_CONFIG.DASHBOARD_ROUTE);
      return true;
    } catch (error:unknown) {
      console.error('Login failed:', error);
      dispatch(setError(((error as { data: { message: string } })?.data?.message || 'Login failed')));
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
    isLoading: isLoginLoading,
    error,
    login: handleLogin,
    logout: handleLogout,
    isAdmin,
  };
};
