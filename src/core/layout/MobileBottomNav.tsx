'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from '@mui/material';

import Icon from '@/lib/icons';
import { ICONS } from '@/lib/icons/icons-const';

import { useAuth } from '../../hooks/use-auth';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { isAdmin } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: ICONS.DASHBOARD_ICON },
    { name: 'Users', path: '/users', icon: ICONS.USERS_ICON, adminOnly: true },
    { name: 'Settings', path: '/settings', icon: ICONS.SETTINGS_ICON },
  ];

  const filteredNavItems = navItems.filter(item => !item.adminOnly || isAdmin());

  const getCurrentValue = () => {
    const currentItem = filteredNavItems.find(item => item.path === pathname);
    return currentItem ? filteredNavItems.indexOf(currentItem) : 0;
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: { xs: 'block', sm: 'none' },
      }}
    >
      <Paper
        elevation={8}
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 0,
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <BottomNavigation
          value={getCurrentValue()}
          sx={{
            background: 'transparent',
            '& .MuiBottomNavigationAction-root': {
              color: 'rgba(255, 255, 255, 0.7)',
              minWidth: 'auto',
              '&.Mui-selected': {
                color: 'white',
              },
            },
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.75rem',
              fontWeight: 500,
            },
          }}
        >
          {filteredNavItems.map((item, index) => (
            <BottomNavigationAction
              key={item.path}
              label={item.name}
              icon={<Icon icon={item.icon} />}
              component={Link}
              href={item.path}
              sx={{
                '&:hover': {
                  color: 'rgba(255, 255, 255, 0.9)',
                },
              }}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
