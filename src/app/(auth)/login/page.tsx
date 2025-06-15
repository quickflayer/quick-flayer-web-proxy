'use client';

import { useEffect } from 'react';

import { Box, CircularProgress } from '@mui/material';

import { AUTH_CONFIG } from '@configs/auth/auth.config';

import { useRouter } from 'next/navigation';

import LoginForm from '@/views/auth/LoginForm';
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

  const handleSwitchToRegister = () => {
    router.push('/register');
  };

  if (isCheckingAuth || isAuthenticated) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <CircularProgress size={48} sx={{ color: 'white' }} />
      </Box>
    );
  }

  return (
    <LoginForm
      onSuccess={handleLoginSuccess}
      onSwitchToRegister={handleSwitchToRegister}
    />
  );
}
