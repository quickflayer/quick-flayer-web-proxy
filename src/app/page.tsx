'use client';

import { useEffect } from 'react';

import { Box, CircularProgress, Typography } from '@mui/material';

import { useRouter } from 'next/navigation';

import { AUTH_CONFIG } from '@configs/auth/auth.config';
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
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress size={64} sx={{ color: 'white', mb: 3 }} />
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, color: 'white', mb: 1 }}
        >
          Quick Flayer
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          Loading your experience...
        </Typography>
      </Box>
    </Box>
  );
}
