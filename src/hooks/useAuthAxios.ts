import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '../lib/store';
import { setCredentials, logout, setError, clearError } from '../redux/auth/auth.slice';
import { storeToken, removeToken, getToken, isTokenExpired } from '../lib/auth/token-manager';
import { AUTH_CONFIG } from '../lib/auth/auth-config';
import AuthService, { LoginRequest, User } from '../redux/auth/auth.service';

export const useAuthAxios = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isAuthenticated, error } = useSelector((state: RootState) => state.auth);
  
  // Local loading states
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);

  // Initialize auth state from stored token
  const initializeAuth = useCallback(async () => {
    try {
      const token = getToken();
      
      if (token && !isTokenExpired(token)) {
        console.log('Valid token found, initializing auth state');
        
        // Set token in Redux state first
        dispatch(setCredentials({ user: null, accessToken: token }));
        
        try {
          // Fetch user profile
          setIsProfileLoading(true);
          const userData = await AuthService.getProfile();
          
          // Update Redux state with user data
          dispatch(setCredentials({ user: userData, accessToken: token }));
          
          console.log('Profile fetched successfully');
        } catch (profileError: any) {
          console.error('Error fetching profile:', profileError);
          removeToken();
          dispatch(logout());
        } finally {
          setIsProfileLoading(false);
        }
      } else {
        console.log('No valid token found, clearing auth state');
        removeToken();
        dispatch(logout());
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      removeToken();
      dispatch(logout());
    } finally {
      setIsCheckingAuth(false);
    }
  }, [dispatch]);

  // Initialize auth on mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Login function
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoginLoading(true);
      dispatch(clearError());
      
      const credentials: LoginRequest = { email, password };
      const result = await AuthService.login(credentials);
      
      // Store token in both localStorage and cookies
      storeToken(result.accessToken);
      
      // Update Redux state
      dispatch(setCredentials(result));
      
      console.log('Login successful, redirecting to dashboard');
      router.push(AUTH_CONFIG.DASHBOARD_ROUTE);
      
      return true;
    } catch (error: any) {
      console.error('Login failed:', error);
      dispatch(setError(error.message || 'Login failed'));
      return false;
    } finally {
      setIsLoginLoading(false);
    }
  }, [dispatch, router]);

  // Logout function
  const handleLogout = useCallback(async () => {
    try {
      console.log('Logging out user');
      
      // Call logout API (optional)
      await AuthService.logout();
    } catch (error) {
      console.error('Logout API call failed:', error);
      // Continue with local logout even if API call fails
    } finally {
      // Remove token from both localStorage and cookies
      removeToken();
      
      // Clear Redux state
      dispatch(logout());
      
      // Redirect to login
      router.push(AUTH_CONFIG.LOGIN_ROUTE);
    }
  }, [dispatch, router]);

  // Refresh user profile
  const refreshProfile = useCallback(async (): Promise<User | null> => {
    if (!isAuthenticated) {
      return null;
    }
    
    try {
      setIsProfileLoading(true);
      const userData = await AuthService.getProfile();
      
      // Update Redux state with fresh user data
      const currentToken = getToken();
      if (currentToken) {
        dispatch(setCredentials({ user: userData, accessToken: currentToken }));
      }
      
      return userData;
    } catch (error: any) {
      console.error('Failed to refresh profile:', error);
      dispatch(setError(error.message || 'Failed to refresh profile'));
      return null;
    } finally {
      setIsProfileLoading(false);
    }
  }, [isAuthenticated, dispatch]);

  // Update profile
  const updateProfile = useCallback(async (updates: Partial<User>): Promise<boolean> => {
    if (!isAuthenticated) {
      return false;
    }
    
    try {
      setIsProfileLoading(true);
      const updatedUser = await AuthService.updateProfile(updates);
      
      // Update Redux state with updated user data
      const currentToken = getToken();
      if (currentToken) {
        dispatch(setCredentials({ user: updatedUser, accessToken: currentToken }));
      }
      
      return true;
    } catch (error: any) {
      console.error('Failed to update profile:', error);
      dispatch(setError(error.message || 'Failed to update profile'));
      return false;
    } finally {
      setIsProfileLoading(false);
    }
  }, [isAuthenticated, dispatch]);

  // Change password
  const changePassword = useCallback(async (currentPassword: string, newPassword: string): Promise<boolean> => {
    if (!isAuthenticated) {
      return false;
    }
    
    try {
      await AuthService.changePassword(currentPassword, newPassword);
      return true;
    } catch (error: any) {
      console.error('Failed to change password:', error);
      dispatch(setError(error.message || 'Failed to change password'));
      return false;
    }
  }, [isAuthenticated, dispatch]);

  // Check if user is admin
  const isAdmin = useCallback((): boolean => {
    return AuthService.isAdmin(user);
  }, [user]);

  // Check if user has specific role
  const hasRole = useCallback((role: string): boolean => {
    return AuthService.hasRole(user, role);
  }, [user]);

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
