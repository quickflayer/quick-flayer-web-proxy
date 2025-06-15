import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '../lib/store/store';
import { useLoginMutation, useGetProfileQuery } from '../lib/api/auth-api';
import { setCredentials, logout, setError } from '../lib/store/slices/auth-slice';
import { storeToken, removeToken, isTokenExpired } from '../lib/auth/token-manager';
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
        const token = localStorage.getItem('auth_token');
        if (token && !isTokenExpired(token)) {
          // Token exists and is valid, dispatch credentials before fetch
          // This avoids dependency cycle with profileData
          dispatch(setCredentials({ user: null, accessToken: token }));
          
          try {
            // Now fetch the profile
            await refetch();
          } catch (profileError) {
            console.error('Error fetching profile:', profileError);
            removeToken();
            dispatch(logout());
          }
        } else {
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
      dispatch(setCredentials(result));
      storeToken(result.accessToken);
      router.push(AUTH_CONFIG.DASHBOARD_ROUTE);
      return true;
    } catch (error:unknown) {
      dispatch(setError(((error as { data: { message: string } })?.data?.message || 'Login failed')));
      return false;
    }
  };

  // Handle logout
  const handleLogout = () => {
    removeToken();
    dispatch(logout());
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
