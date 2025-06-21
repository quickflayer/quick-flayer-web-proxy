'use client';

import { BottomNavigation, BottomNavigationAction, Box, Paper, styled } from '@mui/material';

export const MobileNavContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  display: 'block',
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

export const MobileNavPaper = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: 0,
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  elevation: 8,
}));

export const MobileNavigation = styled(BottomNavigation)(({ theme }) => ({
  background: 'transparent',
  '& .MuiBottomNavigationAction-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    minWidth: 'auto',
    '&.Mui-selected': {
      color: 'white',
    },
    '&:hover': {
      color: 'rgba(255, 255, 255, 0.9)',
    },
  },
  '& .MuiBottomNavigationAction-label': {
    fontSize: '0.75rem',
    fontWeight: 500,
  },
}));

export const StyledBottomNavigationAction = styled(BottomNavigationAction)(({ theme }) => ({
  '&:hover': {
    color: 'rgba(255, 255, 255, 0.9)',
  },
}));
