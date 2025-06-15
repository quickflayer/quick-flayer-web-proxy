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
  ...rest
}) => {
  if (loading) {
    return (
      <LoadingButton
        variant={variant}
        disableElevation
        disableTouchRipple
        size={size}
        disabled={disabled}
        sx={{ minWidth, ...rest.sx }}
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
      sx={{ minWidth, ...rest.sx }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default memo(AppButton);
