'use client';

import { styled } from '@mui/material';
import Box from '@mui/material/Box';

import styles from '@const/styles';

import { hexToRGBA } from '@/utils/color-utils';

export const HorizontalWrapper = styled(Box)(({ theme }) => ({
  '& .MuiTab-root': {
    textTransform: 'none',
    letterSpacing: 0.4,
    color: theme.palette.common.black,
    textAlign: 'start',
    transition: styles.transition.modeTransition,
  },

  '& .MuiTabs-indicator': {
    left: 0,
    width: '3px',
    backgroundColor: theme.palette.primary.main,
  },

  '&.vertical': {
    flexGrow: 1,
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme?.palette?.common?.white,

    '& .MuiTabs-root': {
      minWidth: 180,
      borderTopLeftRadius: theme.shape.borderRadius,
      transition: styles.transition.modeTransition,
    },

    '& .MuiTab-root': {
      borderBottomLeftRadius: theme.shape.borderRadius,
      alignItems: 'flex-start',
      transition: 'background-color 200ms',

      '&.Mui-selected': {
        color: theme.palette.primary.main,
        backgroundColor: hexToRGBA(theme.palette.primary.main, 0.1),
      },
    },
  },

  '& .vertical-tabs': {
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },

  '& .vertical-panels': {
    width: '100%',
    padding: theme.spacing(6),
  },

  '&.horizontal': {
    '& .MuiTabs-root': {
      transition: styles.transition.modeTransition,
      boxShadow: theme.shadows[1],
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.common.white,
    },
  },

  '& .horizontal-panels': {
    transition: styles.transition.modeTransition,
    marginTop: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    padding: theme.spacing(2),
    minHeight: '70vh',
  },
}));
