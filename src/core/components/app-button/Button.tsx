'use client';

import React, { FC, memo } from 'react';

import { Box, Button } from '@mui/material';

import Icon from '@/lib/icons';
import { ICONS } from '@/lib/icons/icons-const';

import { LoadingButton } from './styled-components';
import { AppButtonProps } from './types';

const { LOADING } = ICONS;

const AppButton: FC<AppButtonProps> = ({
  variant = 'contained',
  loading,
  onClick,
  children,
  size = 'medium',
  disabled,
  minWidth,
  gradient = false,
  theme: buttonTheme = 'primary',
  ...rest
}) => {
  const getGradientStyle = () => {
    if (!gradient || variant !== 'contained') return {};

    const gradients = {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      secondary: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
      success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      info: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    };

    return {
      background: gradients[buttonTheme],
      '&:hover': {
        background: gradients[buttonTheme],
        filter: 'brightness(1.1)',
      },
      '&:active': {
        background: gradients[buttonTheme],
        filter: 'brightness(0.95)',
      },
    };
  };
  const gradientStyle = getGradientStyle();
  const buttonSx = { minWidth, ...gradientStyle, ...rest.sx };

  if (loading) {
    return (
      <LoadingButton
        variant={variant}
        disableElevation
        disableTouchRipple
        size={size}
        disabled={disabled}
        sx={buttonSx}
        {...rest}
      >
        <Box className="content">{children}</Box>
        <Icon className="icon" icon={LOADING} fontSize={size} />
      </LoadingButton>
    );
  }

  return (
    <Button
      variant={variant}
      disabled={disabled}
      size={size}
      onClick={onClick}
      sx={buttonSx}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default memo(AppButton);
