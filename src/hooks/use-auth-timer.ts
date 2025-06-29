import { useCallback, useEffect, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { AUTH_CONFIG } from '@/configs/auth/auth.config';
import { USER_ACTIVITY_EVENTS } from '@/constants';
import { RootState } from '@/lib/store';
import { logout } from '@/redux/auth/auth.slice';
import { removeToken } from '@/utils/auth/token-manager';

export const useAuthTimer = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleInactivityLogout = useCallback(() => {
    removeToken();
    dispatch(logout());
    window.location.href = AUTH_CONFIG.LOGIN_ROUTE;
  }, [dispatch]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (isAuthenticated) {
      timerRef.current = setTimeout(
        handleInactivityLogout,
        AUTH_CONFIG.SESSION_TIMEOUT
      );
    }
  }, [handleInactivityLogout, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;

    resetTimer();

    const activityEvents = USER_ACTIVITY_EVENTS;

    const handleUserActivity = () => {
      resetTimer();
    };

    activityEvents.forEach((event) => {
      window.addEventListener(event, handleUserActivity);
    });

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [isAuthenticated, resetTimer]);

  return {
    resetTimer,
  };
};
