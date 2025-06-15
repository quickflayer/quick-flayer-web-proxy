'use client';

import { useEffect } from 'react';

import { AUTH_CONFIG } from '@configs/auth/auth.config';

import { useRouter } from 'next/navigation';

import LoginForm from '@components/auth/LoginForm';
import { useAuth } from '@hooks/use-auth';

export default function LoginPage() {
  const { isAuthenticated, isCheckingAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isCheckingAuth && isAuthenticated) {
      router.replace(AUTH_CONFIG.DASHBOARD_ROUTE);
    }
  }, [isAuthenticated, isCheckingAuth, router]);

  const handleLoginSuccess = () => {
    router.push(AUTH_CONFIG.DASHBOARD_ROUTE);
  };

  if (isCheckingAuth || isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black">Quick Flayer Admin</h1>
          <p className="text-gray-600 mt-2">
            Sign in to access the admin dashboard
          </p>
        </div>
        <LoginForm onSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
}
