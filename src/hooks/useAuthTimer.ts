import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../lib/store/store';
import { logout } from '../lib/store/slices/auth-slice';
import { removeToken } from '../lib/auth/token-manager';
import { AUTH_CONFIG } from '../lib/auth/auth-config';

export const useAuthTimer = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Function to handle user inactivity logout
  const handleInactivityLogout = () => {
    removeToken();
    dispatch(logout());
    window.location.href = AUTH_CONFIG.LOGIN_ROUTE;
  };

  // Reset the timer
  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (isAuthenticated) {
      timerRef.current = setTimeout(handleInactivityLogout, AUTH_CONFIG.SESSION_TIMEOUT);
    }
  };

  // Setup event listeners for user activity
  useEffect(() => {
    if (!isAuthenticated) return;

    // Set initial timer
    resetTimer();

    // Add event listeners to reset timer on user activity
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    const handleUserActivity = () => {
      resetTimer();
    };

    // Add event listeners
    activityEvents.forEach(event => {
      window.addEventListener(event, handleUserActivity);
    });

    // Cleanup
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      activityEvents.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [isAuthenticated]);

  return {
    resetTimer,
  };
};
