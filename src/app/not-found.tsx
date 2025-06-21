'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from '@mui/material';

import Icon from '@lib/icons';
import { ICONS } from '@lib/icons/icons-const';

export default function NotFoundPage() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push('/');
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
            {/* 404 Number */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '6rem', sm: '8rem', md: '10rem' },
                fontWeight: 900,
                color: 'primary.main',
                lineHeight: 0.8,
                mb: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 4px 8px rgba(102, 126, 234, 0.3)',
              }}
            >
              404
            </Typography>

            {/* Not Found Icon */}
            <Box sx={{ mb: 3 }}>
              <Icon
                icon={ICONS.NOT_FOUND}
                sx={{
                  fontSize: { xs: 60, sm: 80, md: 100 },
                  color: 'warning.main',
                  animation: 'float 3s ease-in-out infinite',
                  '@keyframes float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                  },
                }}
              />
            </Box>

            {/* Page Not Found Title */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: 'text.primary',
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
              }}
            >
              Page Not Found
            </Typography>

            {/* Description */}
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
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved. Let&apos;s get you back on track!
            </Typography>

            {/* Suggestions */}
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
                Here are some helpful links:
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  alignItems: 'center',
                }}
              >
                <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'primary.main',
                      '&:hover': { textDecoration: 'underline' },
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Icon icon={ICONS.DASHBOARD_ICON} sx={{ fontSize: 16 }} />
                    Dashboard
                  </Typography>
                </Link>
                <Link href="/settings" style={{ textDecoration: 'none' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'primary.main',
                      '&:hover': { textDecoration: 'underline' },
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Icon icon={ICONS.SETTINGS_ICON} sx={{ fontSize: 16 }} />
                    Settings
                  </Typography>
                </Link>
                <Link href="/masters/users" style={{ textDecoration: 'none' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'primary.main',
                      '&:hover': { textDecoration: 'underline' },
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Icon icon={ICONS.USERS_ICON} sx={{ fontSize: 16 }} />
                    Users
                  </Typography>
                </Link>
              </Box>
            </Box>

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
                onClick={handleGoHome}
                startIcon={<Icon icon={ICONS.HOME} />}
                sx={{
                  minWidth: { xs: '100%', sm: '160px' },
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background:
                      'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                  },
                }}
              >
                Go Home
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={handleGoBack}
                startIcon={<Icon icon={ICONS.BACK_ARROW} />}
                sx={{
                  minWidth: { xs: '100%', sm: '160px' },
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    borderColor: 'primary.main',
                  },
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
              If you believe this is an error, please contact our support team.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
