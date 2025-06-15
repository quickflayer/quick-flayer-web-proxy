"use client";

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../lib/store';
import { useAuth } from '../../hooks/useAuth';
import { useAuthTimer } from '../../hooks/useAuthTimer';

const AuthStateManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <AuthStateManager>{children}</AuthStateManager>
    </Provider>
  );
};
