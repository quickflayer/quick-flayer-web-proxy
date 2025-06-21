'use client';

import { Box, styled } from '@mui/material';

export const LayoutContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
}));

export const HeaderContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1200,
}));

export const MainContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'sidebarWidth',
})<{ sidebarWidth: number }>(({ theme, sidebarWidth }) => ({
  flexGrow: 1,
  width: `calc(100% - ${sidebarWidth}px)`,
  marginTop: '64px',
  minHeight: 'calc(100vh - 64px)',
  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  position: 'relative',
  overflow: 'auto',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    marginTop: '56px',
  },
}));

export const ContentContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 1, 10, 1),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(3),
  },
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    maxWidth: '1400px',
  },
  margin: '0 auto',
  minHeight: 'calc(100vh - 64px)',
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: 0,
  boxShadow: 'none',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  minHeight: 'calc(100vh - 72px)',
  overflow: 'hidden',
  [theme.breakpoints.up('sm')]: {
    borderRadius: theme.spacing(2),
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    minHeight: 'calc(100vh - 96px)',
  },
}));

export const MobileBackdrop = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1100,
}));
