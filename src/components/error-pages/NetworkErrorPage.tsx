'use client';

import { useEffect, useState } from 'react';

import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material';

import Icon from '@lib/icons';
import { ICONS } from '@lib/icons/icons-const';

interface NetworkErrorPageProps {
  onRetry?: () => void;
  showOfflineMessage?: boolean;
  title?: string;
  description?: string;
}

export default function NetworkErrorPage({
  onRetry,
  showOfflineMessage = true,
  title = 'Connection Lost',
  description = 'Unable to connect to our servers. Please check your internet connection.',
}: NetworkErrorPageProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    setIsOnline(navigator.onLine);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const getConnectionStatus = () => {
    if (!isOnline) {
      return {
        status: 'offline',
        message: 'You are currently offline',
        color: 'error.main',
        icon: ICONS.NETWORK_ERROR,
      };
    }
    return {
      status: 'online',
      message: 'Connection restored',
      color: 'success.main',
      icon: ICONS.SUCCESS_ANIMATED,
    };
  };

  const connectionStatus = getConnectionStatus();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: isOnline 
          ? 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
          : 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
        px: 2,
        transition: 'background 0.5s ease-in-out',
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
            {/* Network Status Icon */}
            <Box sx={{ mb: 4 }}>
              <Icon
                icon={connectionStatus.icon}
                sx={{
                  fontSize: { xs: 80, sm: 100, md: 120 },
                  color: connectionStatus.color,
                  animation: isOnline 
                    ? 'successPulse 2s ease-in-out infinite'
                    : 'errorFloat 3s ease-in-out infinite',
                  '@keyframes errorFloat': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                  },
                  '@keyframes successPulse': {
                    '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                    '50%': { opacity: 0.8, transform: 'scale(1.05)' },
                  },
                }}
              />
            </Box>

            {/* Connection Status */}
            {showOfflineMessage && (
              <Box
                sx={{
                  mb: 3,
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: isOnline ? 'success.lighter' : 'error.lighter',
                  border: '1px solid',
                  borderColor: isOnline ? 'success.light' : 'error.light',
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: connectionStatus.color,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: connectionStatus.color,
                      animation: isOnline ? 'none' : 'blink 1s infinite',
                      '@keyframes blink': {
                        '0%, 50%': { opacity: 1 },
                        '51%, 100%': { opacity: 0.3 },
                      },
                    }}
                  />
                  {connectionStatus.message}
                </Typography>
              </Box>
            )}

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
              {title}
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
              {description}
            </Typography>

            {/* Troubleshooting Tips */}
            <Box
              sx={{
                mb: 4,
                p: 3,
                backgroundColor: 'grey.50',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'grey.200',
                textAlign: 'left',
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, mb: 2, color: 'text.primary', textAlign: 'center' }}
              >
                Troubleshooting Tips:
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2 }}>
                <Typography component="li" variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                  Check your internet connection
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                  Try refreshing the page
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                  Disable VPN or proxy if enabled
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                  Check firewall settings
                </Typography>
                <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
                  Contact your network administrator
                </Typography>
              </Box>
            </Box>

            {/* Retry Information */}
            {retryCount > 0 && (
              <Box
                sx={{
                  mb: 4,
                  p: 2,
                  backgroundColor: 'info.lighter',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'info.light',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: 'info.main', fontWeight: 500 }}
                >
                  Retry attempts: {retryCount}
                </Typography>
              </Box>
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
                disabled={!isOnline}
                startIcon={<Icon icon={ICONS.REFRESH} />}
                sx={{
                  minWidth: { xs: '100%', sm: '160px' },
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  opacity: isOnline ? 1 : 0.6,
                }}
              >
                {isOnline ? 'Try Again' : 'Waiting for Connection...'}
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={handleRefresh}
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
                onClick={() => window.history.back()}
                startIcon={<Icon icon={ICONS.BACK_ARROW} />}
                sx={{
                  minWidth: { xs: '100%', sm: '160px' },
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'text.secondary',
                }}
              >
                Go Back
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
              If the problem persists, please contact our technical support team.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
