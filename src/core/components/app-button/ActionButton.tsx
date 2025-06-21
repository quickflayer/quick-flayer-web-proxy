'use client';

import React, { FC, memo } from 'react';

import AppButton from './Button';
import { AppButtonProps } from './types';

interface ActionButtonProps extends Omit<AppButtonProps, 'gradient' | 'theme'> {
  action?: 'create' | 'edit' | 'delete' | 'save' | 'cancel' | 'submit';
}

const ActionButton: FC<ActionButtonProps> = ({
  action = 'submit',
  variant,
  children,
  ...rest
}) => {
  const getActionConfig = () => {
    switch (action) {
      case 'create':
        return {
          variant: 'contained' as const,
          gradient: true,
          theme: 'primary' as const,
        };
      case 'edit':
        return {
          variant: 'contained' as const,
          gradient: true,
          theme: 'info' as const,
        };
      case 'delete':
        return {
          variant: 'contained' as const,
          gradient: true,
          theme: 'error' as const,
        };
      case 'save':
        return {
          variant: 'contained' as const,
          gradient: true,
          theme: 'success' as const,
        };
      case 'cancel':
        return {
          variant: 'outlined' as const,
          gradient: false,
          theme: 'primary' as const,
        };
      case 'submit':
      default:
        return {
          variant: 'contained' as const,
          gradient: true,
          theme: 'primary' as const,
        };
    }
  };

  const actionConfig = getActionConfig();
  const finalVariant = variant || actionConfig.variant;

  return (
    <AppButton
      variant={finalVariant}
      gradient={actionConfig.gradient}
      theme={actionConfig.theme}
      {...rest}
    >
      {children}
    </AppButton>
  );
};

export default memo(ActionButton);
