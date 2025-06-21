'use client';

import { Avatar, Box, IconButton, ListItemButton, styled } from '@mui/material';

export const SidebarContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'sidebarWidth',
})<{ sidebarWidth: number }>(({ theme, sidebarWidth }) => ({
  width: sidebarWidth,
  height: '100%',
  background: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
  borderRight: `1px solid ${theme.palette.divider}`,
  overflow: 'hidden',
}));

export const SidebarHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
}));

export const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

export const LogoIcon = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: theme.spacing(1),
  background: 'rgba(255, 255, 255, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: '1.2rem',
}));

export const NavigationContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  overflow: 'auto',
}));

export const MenuItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => !['active', 'level', 'parentActive'].includes(prop as string),
})<{ active?: boolean; level?: number; parentActive?: boolean }>(
  ({ theme, active, level = 0, parentActive }) => ({
    minHeight: 48,
    paddingLeft: theme.spacing(level * 2 + 2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
    borderRadius: theme.spacing(2),
    transition: 'all 0.2s ease-in-out',
    backgroundColor: active
      ? theme.palette.primary.main
      : parentActive
        ? 'rgba(102, 126, 234, 0.1)'
        : 'transparent',
    color: active ? 'white' : theme.palette.text.primary,
    '&:hover': {
      backgroundColor: active
        ? theme.palette.primary.dark
        : theme.palette.action.hover,
      transform: 'translateX(4px)',
    },
  })
);

export const BadgeContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: 'white',
  borderRadius: '10px',
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  paddingTop: theme.spacing(0.25),
  paddingBottom: theme.spacing(0.25),
  fontSize: '0.75rem',
  fontWeight: 600,
  minWidth: '20px',
  textAlign: 'center',
}));

export const UserProfileContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const UserProfileButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  backgroundColor: theme.palette.primary.main,
  fontSize: '0.8rem',
  fontWeight: 600,
}));

export const LogoutIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.error.main,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
}));
