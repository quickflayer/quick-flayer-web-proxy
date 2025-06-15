'use client';

import { useEffect } from 'react';

import { AUTH_CONFIG } from '@configs/auth/auth.config';

import { useRouter } from 'next/navigation';

import { useAuth } from '@hooks/use-auth';

export default function Home() {
  const { isAuthenticated, isCheckingAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isCheckingAuth) {
      if (isAuthenticated) {
        router.replace(AUTH_CONFIG.DASHBOARD_ROUTE);
      } else {
        router.replace(AUTH_CONFIG.LOGIN_ROUTE);
      }
    }
  }, [isAuthenticated, isCheckingAuth, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Quick Flayer
        </h2>
        <p className="text-gray-500">Loading your experience...</p>
      </div>
    </div>
  );
}
