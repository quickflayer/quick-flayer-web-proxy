'use client';

import { Box, Card, CardContent, Container, Typography } from '@mui/material';

import Icon from '@lib/icons';
import { ICONS } from '@lib/icons/icons-const';

export default function ProtectedLoadingPage() {
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
      <Container maxWidth="sm">
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
              p: { xs: 4, sm: 6 },
              textAlign: 'center',
            }}
          >
            {/* Loading Animation */}
            <Box
              sx={{
                mb: 4,
                position: 'relative',
                display: 'inline-block',
              }}
            >
              {/* Outer Ring */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 100,
                  height: 100,
                  border: '2px solid rgba(102, 126, 234, 0.1)',
                  borderRadius: '50%',
                  animation: 'outerRotate 3s linear infinite',
                  '@keyframes outerRotate': {
                    '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
                    '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
                  },
                }}
              />

              {/* Middle Ring */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 70,
                  height: 70,
                  border: '3px solid rgba(102, 126, 234, 0.3)',
                  borderTop: '3px solid #667eea',
                  borderRadius: '50%',
                  animation: 'middleRotate 2s linear infinite',
                  '@keyframes middleRotate': {
                    '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
                    '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
                  },
                }}
              />

              {/* Inner Ring */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 40,
                  height: 40,
                  border: '2px solid rgba(102, 126, 234, 0.5)',
                  borderTop: '2px solid #667eea',
                  borderRadius: '50%',
                  animation: 'innerRotate 1s linear infinite',
                  '@keyframes innerRotate': {
                    '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
                    '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
                  },
                }}
              />

              {/* Center Icon */}
              <Icon
                icon={ICONS.DASHBOARD_ICON}
                sx={{
                  fontSize: 24,
                  color: 'primary.main',
                  animation: 'centerPulse 2s ease-in-out infinite',
                  '@keyframes centerPulse': {
                    '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                    '50%': { opacity: 0.7, transform: 'scale(1.1)' },
                  },
                }}
              />
            </Box>

            {/* Loading Title */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                mb: 2,
                fontSize: { xs: '1.5rem', sm: '2rem' },
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Loading Dashboard
            </Typography>

            {/* Loading Description */}
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                mb: 4,
                fontSize: { xs: '0.875rem', sm: '1rem' },
                lineHeight: 1.6,
                maxWidth: '400px',
                mx: 'auto',
              }}
            >
              We&apos;re preparing your personalized dashboard experience. 
              This will just take a moment...
            </Typography>

            {/* Progress Bar */}
            <Box
              sx={{
                width: '100%',
                maxWidth: 300,
                height: 6,
                backgroundColor: 'grey.200',
                borderRadius: 3,
                overflow: 'hidden',
                position: 'relative',
                mx: 'auto',
                mb: 3,
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: 3,
                  animation: 'progressMove 2s ease-in-out infinite',
                  '@keyframes progressMove': {
                    '0%': { transform: 'translateX(-100%)' },
                    '50%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(100%)' },
                  },
                }}
              />
            </Box>

            {/* Loading Steps */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 1,
              }}
            >
              {['Authenticating', 'Loading Data', 'Preparing UI'].map((step, index) => (
                <Box
                  key={step}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    opacity: 0.7,
                    animation: `stepFade 3s ease-in-out infinite`,
                    animationDelay: `${index * 1}s`,
                    '@keyframes stepFade': {
                      '0%, 66%, 100%': { opacity: 0.3 },
                      '33%': { opacity: 1 },
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      backgroundColor: 'primary.main',
                      borderRadius: '50%',
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: '0.75rem',
                      color: 'text.secondary',
                      display: { xs: 'none', sm: 'block' },
                    }}
                  >
                    {step}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
