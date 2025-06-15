'use client';

import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

type ColorBoxProps = BoxProps & {
  bgcolor?: string;
};

export const DrawerHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1.5, 3),
  backgroundColor: theme.palette.common.white,

  ['& .header']: {
    fontSize: 16,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.primary.main,
  },

  ['& .close']: {
    ['& svg']: {
      fontSize: 22,
    },
  },
}));

export const DrawerFooter = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'sticky',
  bottom: 0,
  display: 'flex',
  gap: 8,
  padding: theme.spacing(1),
  zIndex: 300,
  backgroundColor: theme.palette.common.white,
}));

export const Content = styled(Box)<BoxProps>(({ theme }) => ({
  overflow: 'auto',
  flexGrow: 1,
  padding: theme.spacing(3, 5),
  backgroundColor: theme.palette.common.white,
}));

export const ColorBox = styled(Box)<ColorBoxProps>(({ theme, bgcolor }) => ({
  width: '16px',
  height: '16px',
  backgroundColor: bgcolor || theme.palette.grey[300],
  borderRadius: '4px',
  marginRight: theme.spacing(1),
}));
