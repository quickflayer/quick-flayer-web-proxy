'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/use-auth';
import { AUTH_CONFIG } from '../../configs/auth/auth.config';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  adminOnly = false,
}) => {
  const { isAuthenticated, isCheckingAuth, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isCheckingAuth) {
      if (!isAuthenticated) {
        // Not authenticated, redirect to login
        router.replace(AUTH_CONFIG.LOGIN_ROUTE);
      } else if (adminOnly && !isAdmin()) {
        // Authenticated but not admin, and route requires admin
        router.replace(AUTH_CONFIG.UNAUTHORIZED_ROUTE);
      }
    }
  }, [isAuthenticated, isCheckingAuth, isAdmin, adminOnly, router]);

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Only render children if authenticated and (not adminOnly or user is admin)
  if (isAuthenticated && (!adminOnly || isAdmin())) {
    return <>{children}</>;
  }

  // Render nothing while redirecting
  return null;
};
