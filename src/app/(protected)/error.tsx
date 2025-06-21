'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Box, Button, Card, CardContent, Container, Divider, Typography } from '@mui/material';

import Icon from '@lib/icons';
import { ICONS } from '@lib/icons/icons-const';

import { logger } from '@/utils/logger';

interface ProtectedErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProtectedErrorPage({ error, reset }: ProtectedErrorPageProps) {
  const router = useRouter();

  useEffect(() => {
    logger.error('Protected Route Error:', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      route: 'protected',
      timestamp: new Date().toISOString(),
    });
  }, [error]);

  const handleRetry = () => {
    reset();
  };

  const handleRefreshPage = () => {
    window.location.reload();
  };

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  const handleGoToSettings = () => {
    router.push('/settings');
  };

  const handleLogout = () => {
    // Clear auth and redirect to login
    localStorage.removeItem('auth');
    sessionStorage.clear();
    router.push('/login');
  };

  const getErrorType = () => {
    const message = error.message.toLowerCase();
    if (message.includes('network') || message.includes('fetch')) {
      return 'network';
    }
    if (message.includes('unauthorized') || message.includes('403') || message.includes('401')) {
      return 'auth';
    }
    if (message.includes('timeout')) {
      return 'timeout';
    }
    if (message.includes('server') || message.includes('500')) {
      return 'server';
    }
    return 'general';
  };

  const getErrorContent = () => {
    const errorType = getErrorType();
    
    switch (errorType) {
      case 'network':
        return {
          icon: ICONS.NETWORK_ERROR,
          title: 'Connection Error',
          description: 'Unable to connect to our servers. Please check your internet connection and try again.',
          color: 'warning.main',
        };
      case 'auth':
        return {
          icon: ICONS.EXCLAMATION_ANIMATED,
          title: 'Access Denied',
          description: 'Your session may have expired or you don\'t have permission to access this resource.',
          color: 'error.main',
        };
      case 'timeout':
        return {
          icon: ICONS.LOADING_SPINNER,
          title: 'Request Timeout',
          description: 'The request took too long to complete. Please try again.',
          color: 'info.main',
        };
      case 'server':
        return {
          icon: ICONS.SERVER_ERROR,
          title: 'Server Error',
          description: 'Our servers are experiencing issues. Our team has been notified.',
          color: 'error.main',
        };
      default:
        return {
          icon: ICONS.ERROR_CIRCLE,
          title: 'Something Went Wrong',
          description: 'An unexpected error occurred while loading this page.',
          color: 'error.main',
        };
    }
  };

  const errorContent = getErrorContent();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <CardContent
            sx={{
              p: { xs: 4, sm: 6, md: 8 },
              textAlign: 'center',
            }}
          >
            {/* Error Icon */}
            <Box sx={{ mb: 4 }}>
              <Icon
                icon={errorContent.icon}
                sx={{
                  fontSize: { xs: 80, sm: 100, md: 120 },
                  color: errorContent.color,
                  animation: 'errorPulse 2s ease-in-out infinite',
                  '@keyframes errorPulse': {
                    '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                    '50%': { opacity: 0.8, transform: 'scale(1.05)' },
                  },
                }}
              />
            </Box>

            {/* Error Title */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: 'text.primary',
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
              }}
            >
              {errorContent.title}
            </Typography>

            {/* Error Description */}
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                color: 'text.secondary',
                fontSize: { xs: '1rem', sm: '1.125rem' },
                lineHeight: 1.6,
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              {errorContent.description}
            </Typography>

            {/* Quick Actions */}
            <Box
              sx={{
                mb: 4,
                p: 3,
                backgroundColor: 'grey.50',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'grey.200',
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}
              >
                Quick Actions:
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  justifyContent: 'center',
                }}
              >
                <Button
                  variant="text"
                  size="small"
                  onClick={handleGoToDashboard}
                  startIcon={<Icon icon={ICONS.DASHBOARD_ICON} />}
                  sx={{ fontSize: '0.875rem' }}
                >
                  Dashboard
                </Button>
                <Button
                  variant="text"
                  size="small"
                  onClick={handleGoToSettings}
                  startIcon={<Icon icon={ICONS.SETTINGS_ICON} />}
                  sx={{ fontSize: '0.875rem' }}
                >
                  Settings
                </Button>
                {getErrorType() === 'auth' && (
                  <Button
                    variant="text"
                    size="small"
                    onClick={handleLogout}
                    startIcon={<Icon icon={ICONS.LOGOUT_ICON} />}
                    sx={{ fontSize: '0.875rem', color: 'error.main' }}
                  >
                    Logout
                  </Button>
                )}
              </Box>
            </Box>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && (
              <>
                <Divider sx={{ mb: 3 }} />
                <Box
                  sx={{
                    mb: 4,
                    p: 3,
                    backgroundColor: 'grey.100',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'grey.300',
                    textAlign: 'left',
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mb: 1, color: 'error.main' }}
                  >
                    Development Error Details:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      color: 'text.secondary',
                      wordBreak: 'break-word',
                      mb: 1,
                    }}
                  >
                    <strong>Message:</strong> {error.message}
                  </Typography>
                  {error.digest && (
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                        color: 'text.disabled',
                      }}
                    >
                      <strong>Digest:</strong> {error.digest}
                    </Typography>
                  )}
                </Box>
              </>
            )}

            {/* Action Buttons */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={handleRetry}
                startIcon={<Icon icon={ICONS.REFRESH} />}
                sx={{
                  minWidth: { xs: '100%', sm: '160px' },
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                }}
              >
                Try Again
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={handleRefreshPage}
                startIcon={<Icon icon={ICONS.REFRESH} />}
                sx={{
                  minWidth: { xs: '100%', sm: '160px' },
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                }}
              >
                Refresh Page
              </Button>

              <Button
                variant="text"
                size="large"
                onClick={handleGoToDashboard}
                startIcon={<Icon icon={ICONS.HOME} />}
                sx={{
                  minWidth: { xs: '100%', sm: '160px' },
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'text.secondary',
                }}
              >
                Dashboard
              </Button>
            </Box>

            {/* Help Text */}
            <Typography
              variant="body2"
              sx={{
                mt: 4,
                color: 'text.disabled',
                fontSize: '0.875rem',
              }}
            >
              Error persisting? Contact support with error ID: {error.digest || 'N/A'}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
