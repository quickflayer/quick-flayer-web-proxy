'use client';

import React, { Component, ReactNode } from 'react';

import { Box, Button, Card, CardContent, Typography } from '@mui/material';

import Icon from '@lib/icons';
import { ICONS } from '@lib/icons/icons-const';

import { logger } from '@/utils/logger';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  showDetails?: boolean;
  title?: string;
  description?: string;
  variant?: 'card' | 'inline' | 'fullscreen';
  showRetry?: boolean;
  showReload?: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error
    logger.error('Error Boundary Caught Error:', {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  renderErrorContent() {
    const {
      title = 'Something went wrong',
      description = 'An unexpected error occurred. Please try again.',
      showDetails = false,
      showRetry = true,
      showReload = true,
      variant = 'card',
    } = this.props;

    const { error, errorInfo } = this.state;

    const errorContent = (
      <>
        {/* Error Icon */}
        <Box
          sx={{
            mb: variant === 'inline' ? 2 : 3,
            textAlign: 'center',
          }}
        >
          <Icon
            icon={ICONS.ERROR_CIRCLE}
            sx={{
              fontSize: variant === 'inline' ? 40 : { xs: 60, sm: 80 },
              color: 'error.main',
              animation: 'errorShake 0.5s ease-in-out infinite alternate',
              '@keyframes errorShake': {
                '0%': { transform: 'translateX(0)' },
                '100%': { transform: 'translateX(2px)' },
              },
            }}
          />
        </Box>

        {/* Error Title */}
        <Typography
          variant={variant === 'inline' ? 'h6' : 'h5'}
          sx={{
            fontWeight: 600,
            mb: 2,
            color: 'text.primary',
            textAlign: 'center',
          }}
        >
          {title}
        </Typography>

        {/* Error Description */}
        <Typography
          variant="body2"
          sx={{
            mb: showDetails || showRetry || showReload ? 3 : 0,
            color: 'text.secondary',
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          {description}
        </Typography>

        {/* Error Details (Development Only) */}
        {showDetails && process.env.NODE_ENV === 'development' && error && (
          <Box
            sx={{
              mb: 3,
              p: 2,
              backgroundColor: 'grey.100',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'grey.300',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: 'error.main',
                display: 'block',
                mb: 1,
              }}
            >
              Error Details (Development):
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                color: 'text.secondary',
                wordBreak: 'break-word',
                display: 'block',
                mb: 1,
              }}
            >
              {error.message}
            </Typography>
            {errorInfo && (
              <Typography
                variant="caption"
                sx={{
                  fontFamily: 'monospace',
                  fontSize: '0.7rem',
                  color: 'text.disabled',
                  wordBreak: 'break-word',
                  display: 'block',
                  maxHeight: 100,
                  overflow: 'auto',
                }}
              >
                {errorInfo.componentStack}
              </Typography>
            )}
          </Box>
        )}

        {/* Action Buttons */}
        {(showRetry || showReload) && (
          <Box
            sx={{
              display: 'flex',
              flexDirection:
                variant === 'inline' ? 'row' : { xs: 'column', sm: 'row' },
              gap: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {showRetry && (
              <Button
                variant="contained"
                size={variant === 'inline' ? 'small' : 'medium'}
                onClick={this.handleRetry}
                startIcon={<Icon icon={ICONS.REFRESH} />}
                sx={{
                  minWidth:
                    variant === 'inline' ? 'auto' : { xs: '100%', sm: '140px' },
                  fontSize: variant === 'inline' ? '0.875rem' : '1rem',
                }}
              >
                Try Again
              </Button>
            )}

            {showReload && (
              <Button
                variant="outlined"
                size={variant === 'inline' ? 'small' : 'medium'}
                onClick={this.handleReload}
                startIcon={<Icon icon={ICONS.REFRESH} />}
                sx={{
                  minWidth:
                    variant === 'inline' ? 'auto' : { xs: '100%', sm: '140px' },
                  fontSize: variant === 'inline' ? '0.875rem' : '1rem',
                }}
              >
                Reload Page
              </Button>
            )}
          </Box>
        )}
      </>
    );

    // Render based on variant
    switch (variant) {
      case 'fullscreen':
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
            <Card
              sx={{
                maxWidth: 500,
                width: '100%',
                borderRadius: 4,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <CardContent sx={{ p: { xs: 4, sm: 6 } }}>
                {errorContent}
              </CardContent>
            </Card>
          </Box>
        );

      case 'card':
        return (
          <Card
            sx={{
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'error.light',
              backgroundColor: 'error.lighter',
            }}
          >
            <CardContent sx={{ p: 3 }}>{errorContent}</CardContent>
          </Card>
        );

      case 'inline':
      default:
        return (
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'error.light',
              backgroundColor: 'rgba(244, 67, 54, 0.04)',
              textAlign: 'center',
            }}
          >
            {errorContent}
          </Box>
        );
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return this.renderErrorContent();
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
