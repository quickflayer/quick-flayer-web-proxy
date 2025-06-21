'use client';

import { Box, Typography } from '@mui/material';

import Icon from '@lib/icons';
import { ICONS } from '@lib/icons/icons-const';

export default function LoadingPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Animation */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
          `,
          animation: 'backgroundFloat 6s ease-in-out infinite',
          '@keyframes backgroundFloat': {
            '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
            '50%': { transform: 'scale(1.1) rotate(2deg)' },
          },
        }}
      />

      {/* Main Content */}
      <Box
        sx={{
          textAlign: 'center',
          zIndex: 1,
          position: 'relative',
        }}
      >
        {/* Loading Icon */}
        <Box
          sx={{
            mb: 4,
            position: 'relative',
          }}
        >
          {/* Outer Ring */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: 120, sm: 140, md: 160 },
              height: { xs: 120, sm: 140, md: 160 },
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              animation: 'outerRing 3s linear infinite',
              '@keyframes outerRing': {
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
              width: { xs: 80, sm: 100, md: 120 },
              height: { xs: 80, sm: 100, md: 120 },
              border: '3px solid rgba(255, 255, 255, 0.4)',
              borderTop: '3px solid white',
              borderRadius: '50%',
              animation: 'innerRing 1.5s linear infinite',
              '@keyframes innerRing': {
                '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
                '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
              },
            }}
          />

          {/* Center Icon */}
          <Icon
            icon={ICONS.LOADING_PULSE}
            sx={{
              fontSize: { xs: 40, sm: 50, md: 60 },
              color: 'white',
              animation: 'pulse 2s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                '50%': { opacity: 0.7, transform: 'scale(1.1)' },
              },
            }}
          />
        </Box>

        {/* App Title */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: 'white',
            mb: 2,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            animation: 'titleFade 2s ease-in-out infinite alternate',
            '@keyframes titleFade': {
              '0%': { opacity: 0.8 },
              '100%': { opacity: 1 },
            },
          }}
        >
          Quick Flayer
        </Typography>

        {/* Loading Text */}
        <Typography
          variant="h6"
          sx={{
            color: 'rgba(255, 255, 255, 0.9)',
            mb: 4,
            fontSize: { xs: '1rem', sm: '1.25rem' },
            fontWeight: 400,
            animation: 'textFloat 3s ease-in-out infinite',
            '@keyframes textFloat': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-5px)' },
            },
          }}
        >
          Loading your experience...
        </Typography>

        {/* Loading Dots */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            mb: 4,
          }}
        >
          {[0, 1, 2].map((index) => (
            <Box
              key={index}
              sx={{
                width: 12,
                height: 12,
                backgroundColor: 'white',
                borderRadius: '50%',
                animation: `dotBounce 1.4s ease-in-out infinite both`,
                animationDelay: `${index * 0.16}s`,
                '@keyframes dotBounce': {
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

        {/* Progress Indicator */}
        <Box
          sx={{
            width: { xs: 200, sm: 250, md: 300 },
            height: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              height: '100%',
              background: 'linear-gradient(90deg, transparent, white, transparent)',
              borderRadius: 2,
              animation: 'progressSlide 2s ease-in-out infinite',
              '@keyframes progressSlide': {
                '0%': { transform: 'translateX(-100%)' },
                '100%': { transform: 'translateX(100%)' },
              },
            }}
          />
        </Box>

        {/* Subtitle */}
        <Typography
          variant="body2"
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            mt: 3,
            fontSize: { xs: '0.875rem', sm: '1rem' },
            fontWeight: 300,
          }}
        >
          Please wait while we prepare everything for you
        </Typography>
      </Box>
    </Box>
  );
}
