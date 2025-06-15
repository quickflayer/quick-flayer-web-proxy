'use client';

import { Box, Button, styled } from '@mui/material';

export const LoadingButton = styled(Button)({
  position: 'relative',

  ['& .content']: {
    visibility: 'hidden',
  },

  ['& .icon']: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
  },
});

export const ButtonGroupContainer = styled(Box)(({ theme }) => ({
  userSelect: 'none',
  display: 'flex',
  gap: theme.spacing(0.5),
  flexDirection: 'row-reverse',
  width: '100%',
}));
