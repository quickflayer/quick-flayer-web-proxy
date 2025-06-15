'use client';

import { Box, styled, Typography } from '@mui/material';

import styles from '@/styles/common';

export const StyledTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
  transition: styles.transition.modeTransition,
}));

export const ActionTitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(1.5),
}));
