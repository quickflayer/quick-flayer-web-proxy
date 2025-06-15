'use client';

import { Box, Button } from '@mui/material';
import React, { FC, memo, useMemo } from 'react';

import { keyActions } from '@/constants/common/key-actions';
import { ICONS } from '@/lib/icons/icons-const';
import useKeyActions from '@core/hooks/use-key-action';

import { LoadingButton } from './styled-components';
import { AppButtonProps } from './types';
import Icon from '../../../lib/icons';

const { LOADING } = ICONS;

const AppButton: FC<AppButtonProps> = ({
  variant = 'contained',
  loading,
  onClick,
  children,
  size = 'medium',
  keyFor,
  disabled,
  minWidth,
  ...rest
}) => {
  const keyAction = useMemo(
    () => keyActions.find((item) => item.action === keyFor),
    [keyFor],
  );

  const keys = useMemo(() => {
    if (!keyAction) {
      return '';
    }

    return keyAction.modifier
      ? `(${keyAction.modifier}+${keyAction.key})`
      : keyAction.key;
  }, [keyAction]);

  useKeyActions(keyFor, onClick, loading || !keyAction || disabled);

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
        <Box className="content">
          {children}&nbsp;{keys}
        </Box>
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
      {children}&nbsp;{keys}
    </Button>
  );
};

export default memo(AppButton);
