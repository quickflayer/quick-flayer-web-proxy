'use client';

import { Box, Card, CardContent, Typography } from '@mui/material';

import Icon from '@lib/icons';
import { ICONS } from '@lib/icons/icons-const';

export default function AuthLoadingPage() {
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
          maxWidth: 400,
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
          {/* Loading Icon */}
          <Box
            sx={{
              mb: 3,
              position: 'relative',
              display: 'inline-block',
            }}
          >
            {/* Spinning Ring */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 80,
                height: 80,
                border: '3px solid rgba(102, 126, 234, 0.2)',
                borderTop: '3px solid #667eea',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                '@keyframes spin': {
                  '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
                  '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
                },
              }}
            />

            {/* Center Icon */}
            <Icon
              icon={ICONS.LOADING_DOTS}
              sx={{
                fontSize: 40,
                color: 'primary.main',
                animation: 'pulse 1.5s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0.6 },
                },
              }}
            />
          </Box>

          {/* Loading Title */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              mb: 2,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
            }}
          >
            Authenticating
          </Typography>

          {/* Loading Description */}
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              mb: 3,
              fontSize: { xs: '0.875rem', sm: '1rem' },
              lineHeight: 1.5,
            }}
          >
            Please wait while we verify your credentials...
          </Typography>

          {/* Animated Dots */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 0.5,
            }}
          >
            {[0, 1, 2].map((index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  backgroundColor: 'primary.main',
                  borderRadius: '50%',
                  animation: `dotPulse 1.4s ease-in-out infinite both`,
                  animationDelay: `${index * 0.16}s`,
                  '@keyframes dotPulse': {
                    '0%, 80%, 100%': {
                      transform: 'scale(0)',
                      opacity: 0.5,
                    },
                    '40%': {
                      transform: 'scale(1)',
                      opacity: 1,
                    },
                  },
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
