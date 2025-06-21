'use client';

import React from 'react';


import { useAuth } from '@hooks/use-auth';
import { useAuthTimer } from '@hooks/use-auth-timer';

interface AuthStateManagerProps {
  children: React.ReactNode;
}

const AuthStateManager = ({ children }: AuthStateManagerProps) => {
  const { isCheckingAuth } = useAuth();
  useAuthTimer();

  if (isCheckingAuth) {
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
  return <AuthStateManager>{children}</AuthStateManager>;
};

export default React.memo(AuthProvider);
