'use client';

import { useEffect, useState } from 'react';

import { Box, Button, Card, CardContent, Container, LinearProgress, Typography } from '@mui/material';

import Icon from '@lib/icons';
import { ICONS } from '@lib/icons/icons-const';

interface MaintenancePageProps {
  estimatedDuration?: string;
  startTime?: Date;
  endTime?: Date;
  message?: string;
  showProgress?: boolean;
  contactEmail?: string;
  statusUrl?: string;
}

export default function MaintenancePage({
  estimatedDuration = '2-3 hours',
  startTime,
  endTime,
  message = 'We are currently performing scheduled maintenance to improve your experience.',
  showProgress = true,
  contactEmail = 'support@quickflayer.com',
  statusUrl,
}: MaintenancePageProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (startTime && endTime) {
      const total = endTime.getTime() - startTime.getTime();
      const elapsed = currentTime.getTime() - startTime.getTime();
      const progressPercent = Math.min(Math.max((elapsed / total) * 100, 0), 100);
      setProgress(progressPercent);
    }
  }, [currentTime, startTime, endTime]);

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });
  };

  const getTimeRemaining = () => {
    if (!endTime) return null;
    
    const remaining = endTime.getTime() - currentTime.getTime();
    if (remaining <= 0) return 'Maintenance should be completed';
    
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `Estimated completion: ${hours}h ${minutes}m`;
    }
    return `Estimated completion: ${minutes}m`;
  };

  const handleCheckStatus = () => {
    if (statusUrl) {
      window.open(statusUrl, '_blank');
    } else {
      window.location.reload();
    }
  };

  const handleContactSupport = () => {
    window.location.href = `mailto:${contactEmail}?subject=Maintenance Inquiry`;
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
          animation: 'backgroundFloat 8s ease-in-out infinite',
          '@keyframes backgroundFloat': {
            '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
            '50%': { transform: 'scale(1.1) rotate(1deg)' },
          },
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
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
            {/* Maintenance Icon */}
            <Box sx={{ mb: 4 }}>
              <Icon
                icon={ICONS.MASTER}
                sx={{
                  fontSize: { xs: 80, sm: 100, md: 120 },
                  color: 'warning.main',
                  animation: 'maintenanceRotate 4s linear infinite',
                  '@keyframes maintenanceRotate': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                  },
                }}
              />
            </Box>

            {/* Maintenance Title */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: 'text.primary',
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
              }}
            >
              Under Maintenance
            </Typography>

            {/* Maintenance Message */}
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
              {message}
            </Typography>

            {/* Progress Bar */}
            {showProgress && startTime && endTime && (
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="body2"
                  sx={{ mb: 2, color: 'text.secondary', fontWeight: 500 }}
                >
                  Maintenance Progress
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                    },
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{ mt: 1, color: 'text.disabled', display: 'block' }}
                >
                  {Math.round(progress)}% Complete
                </Typography>
              </Box>
            )}

            {/* Time Information */}
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
                Maintenance Schedule
              </Typography>
              
              {startTime && (
                <Typography
                  variant="body2"
                  sx={{ mb: 1, color: 'text.secondary' }}
                >
                  <strong>Started:</strong> {formatTime(startTime)}
                </Typography>
              )}
              
              {endTime && (
                <Typography
                  variant="body2"
                  sx={{ mb: 1, color: 'text.secondary' }}
                >
                  <strong>Expected End:</strong> {formatTime(endTime)}
                </Typography>
              )}
              
              <Typography
                variant="body2"
                sx={{ mb: 1, color: 'text.secondary' }}
              >
                <strong>Duration:</strong> {estimatedDuration}
              </Typography>
              
              {getTimeRemaining() && (
                <Typography
                  variant="body2"
                  sx={{ 
                    color: endTime && currentTime > endTime ? 'success.main' : 'warning.main',
                    fontWeight: 500,
                  }}
                >
                  {getTimeRemaining()}
                </Typography>
              )}
            </Box>

            {/* Current Time */}
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
                Current Time: {formatTime(currentTime)}
              </Typography>
            </Box>

            {/* What We're Doing */}
            <Box
              sx={{
                mb: 4,
                p: 3,
                backgroundColor: 'primary.lighter',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'primary.light',
                textAlign: 'left',
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, mb: 2, color: 'primary.main', textAlign: 'center' }}
              >
                What We're Working On:
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2 }}>
                <Typography component="li" variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                  Server performance improvements
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                  Security updates and patches
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                  Database optimization
                </Typography>
                <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
                  New feature deployments
                </Typography>
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
                onClick={handleCheckStatus}
                startIcon={<Icon icon={ICONS.REFRESH} />}
                sx={{
                  minWidth: { xs: '100%', sm: '160px' },
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                  },
                }}
              >
                {statusUrl ? 'Check Status' : 'Refresh'}
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={handleContactSupport}
                startIcon={<Icon icon={ICONS.USER_ICON} />}
                sx={{
                  minWidth: { xs: '100%', sm: '160px' },
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                }}
              >
                Contact Support
              </Button>
            </Box>

            {/* Footer Message */}
            <Typography
              variant="body2"
              sx={{
                mt: 4,
                color: 'text.disabled',
                fontSize: '0.875rem',
              }}
            >
              Thank you for your patience. We'll be back online shortly!
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
