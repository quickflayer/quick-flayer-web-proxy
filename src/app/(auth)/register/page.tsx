'use client';

import { useEffect } from 'react';

import { AUTH_CONFIG } from '@configs/auth/auth.config';

import { useRouter } from 'next/navigation';

import RegisterForm from '@components/auth/RegisterForm';
import { useAuth } from '@hooks/use-auth';

export default function RegisterPage() {
  const { isAuthenticated, isCheckingAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isCheckingAuth && isAuthenticated) {
      router.replace(AUTH_CONFIG.DASHBOARD_ROUTE);
    }
  }, [isAuthenticated, isCheckingAuth, router]);

  const handleRegisterSuccess = () => {
    router.push(AUTH_CONFIG.DASHBOARD_ROUTE);
  };

  const handleSwitchToLogin = () => {
    router.push(AUTH_CONFIG.LOGIN_ROUTE);
  };

  if (isCheckingAuth || isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Quick Flayer
          </h1>
          <p className="text-gray-600">
            Create your account to get started
          </p>
        </div>
        <RegisterForm 
          onSuccess={handleRegisterSuccess}
          onSwitchToLogin={handleSwitchToLogin}
        />
      </div>
    </div>
  );
}
