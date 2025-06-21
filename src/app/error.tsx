'use client';

import { useEffect } from 'react';

import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material';

import Icon from '@lib/icons';
import { ICONS } from '@lib/icons/icons-const';

import { logger } from '@/utils/logger';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    logger.error('Global Error Boundary:', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error]);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

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
                icon={ICONS.ERROR_CIRCLE}
                sx={{
                  fontSize: { xs: 80, sm: 100, md: 120 },
                  color: 'error.main',
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.7 },
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
              Oops! Something went wrong
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
              We encountered an unexpected error. Don&apos;t worry, our team has been notified and is working to fix this issue.
            </Typography>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && (
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
                  Error Details (Development Mode):
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                    wordBreak: 'break-word',
                  }}
                >
                  {error.message}
                </Typography>
                {error.digest && (
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: 'monospace',
                      fontSize: '0.75rem',
                      color: 'text.disabled',
                      mt: 1,
                    }}
                  >
                    Digest: {error.digest}
                  </Typography>
                )}
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
                onClick={reset}
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
                onClick={handleGoHome}
                startIcon={<Icon icon={ICONS.HOME} />}
                sx={{
                  minWidth: { xs: '100%', sm: '160px' },
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'text.secondary',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                Go Home
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
              If the problem persists, please contact our support team.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
