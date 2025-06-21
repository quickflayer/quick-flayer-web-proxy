'use client';

import { useEffect } from 'react';

import { Box, CircularProgress } from '@mui/material';


import { useRouter } from 'next/navigation';

import { AUTH_CONFIG } from '@configs/auth/auth.config';
import { useAuth } from '@hooks/use-auth';
import RegisterForm from '@views/auth/RegisterForm';

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
    <RegisterForm
      onSuccess={handleRegisterSuccess}
      onSwitchToLogin={handleSwitchToLogin}
    />
  );
}
