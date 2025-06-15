'use client';

// React imports (first)
import React from 'react';

// External dependencies (alphabetical)
import { Provider } from 'react-redux';

// @/** imports
import { useAuth } from '@/hooks/use-auth';
import { useAuthTimer } from '@/hooks/use-auth-timer';

// Relative imports
import { store } from '../../lib/store';

interface AuthStateManagerProps {
  children: React.ReactNode;
}

const AuthStateManager = ({ children }: AuthStateManagerProps) => {
  const { isCheckingAuth } = useAuth();
  useAuthTimer(); // Set up the inactivity timer

  if (isCheckingAuth) {
    // You could render a loading spinner or skeleton here
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  return (
    <Provider store={store}>
      <AuthStateManager>{children}</AuthStateManager>
    </Provider>
  );
};

export default React.memo(AuthProvider);
