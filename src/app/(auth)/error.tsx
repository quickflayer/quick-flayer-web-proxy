'use client';

import { useEffect } from 'react';

import { Box, Button, Card, CardContent, Typography } from '@mui/material';

import { useRouter } from 'next/navigation';


import Icon from '@lib/icons';
import { ICONS } from '@lib/icons/icons-const';

import { logger } from '@/utils/logger';

interface AuthErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AuthErrorPage({ error, reset }: AuthErrorPageProps) {
  const router = useRouter();

  useEffect(() => {
    logger.error('Auth Route Error:', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      route: 'auth',
    });
  }, [error]);

  const handleRetryAuth = () => {
    reset();
  };

  const handleGoToLogin = () => {
    router.push('/login');
  };

  const handleGoToRegister = () => {
    router.push('/register');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  const getErrorMessage = () => {
    if (error.message.toLowerCase().includes('network')) {
      return 'Unable to connect to our authentication servers. Please check your internet connection.';
    }
    if (error.message.toLowerCase().includes('timeout')) {
      return 'Authentication request timed out. Please try again.';
    }
    if (error.message.toLowerCase().includes('unauthorized')) {
      return 'Authentication failed. Please check your credentials and try again.';
    }
    return 'We encountered an issue during authentication. Please try again.';
  };

  const getErrorIcon = () => {
    if (error.message.toLowerCase().includes('network')) {
      return ICONS.NETWORK_ERROR;
    }
    if (error.message.toLowerCase().includes('unauthorized')) {
      return ICONS.EXCLAMATION_ANIMATED;
    }
    return ICONS.ERROR_CIRCLE;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        px: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          width: '100%',
          borderRadius: 4,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <CardContent
          sx={{
            p: { xs: 4, sm: 6 },
            textAlign: 'center',
          }}
        >
          {/* Error Icon */}
          <Box sx={{ mb: 3 }}>
            <Icon
              icon={getErrorIcon()}
              sx={{
                fontSize: { xs: 60, sm: 80 },
                color: 'error.main',
                animation: 'shake 0.5s ease-in-out infinite alternate',
                '@keyframes shake': {
                  '0%': { transform: 'translateX(0)' },
                  '100%': { transform: 'translateX(4px)' },
                },
              }}
            />
          </Box>

          {/* Error Title */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: 'text.primary',
              fontSize: { xs: '1.5rem', sm: '2rem' },
            }}
          >
            Authentication Error
          </Typography>

          {/* Error Description */}
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: 'text.secondary',
              fontSize: { xs: '0.875rem', sm: '1rem' },
              lineHeight: 1.6,
            }}
          >
            {getErrorMessage()}
          </Typography>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === 'development' && (
            <Box
              sx={{
                mb: 4,
                p: 2,
                backgroundColor: 'grey.100',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'grey.300',
                textAlign: 'left',
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontWeight: 600, color: 'error.main', display: 'block', mb: 1 }}
              >
                Debug Info:
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  color: 'text.secondary',
                  wordBreak: 'break-word',
                  display: 'block',
                }}
              >
                {error.message}
              </Typography>
            </Box>
          )}

          {/* Action Buttons */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              mb: 3,
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={handleRetryAuth}
              startIcon={<Icon icon={ICONS.REFRESH} />}
              sx={{
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                },
              }}
            >
              Try Again
            </Button>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                size="large"
                onClick={handleGoToLogin}
                startIcon={<Icon icon={ICONS.USER_ICON} />}
                sx={{
                  flex: 1,
                  py: 1.5,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                Go to Login
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={handleGoToRegister}
                startIcon={<Icon icon={ICONS.USER_ICON} />}
                sx={{
                  flex: 1,
                  py: 1.5,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                Register
              </Button>
            </Box>

            <Button
              variant="text"
              size="large"
              onClick={handleGoHome}
              startIcon={<Icon icon={ICONS.HOME} />}
              sx={{
                py: 1.5,
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'text.secondary',
              }}
            >
              Back to Home
            </Button>
          </Box>

          {/* Help Text */}
          <Typography
            variant="body2"
            sx={{
              color: 'text.disabled',
              fontSize: '0.75rem',
            }}
          >
            Need help? Contact our support team for assistance.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
