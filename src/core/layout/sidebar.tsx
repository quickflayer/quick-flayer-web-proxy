'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';

import Icon from '@/lib/icons';
import { ICONS } from '@/lib/icons/icons-const';

import { useAuth } from '../../hooks/use-auth';
import { useMobile } from '../../hooks/use-mobile';

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const { isAdmin } = useAuth();
  const isMobile = useMobile();
  const theme = useTheme();

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: ICONS.DASHBOARD_ICON },
    { name: 'Users', path: '/users', icon: ICONS.USERS_ICON, adminOnly: true },
    { name: 'Settings', path: '/settings', icon: ICONS.SETTINGS_ICON },
  ];

  const handleNavClick = () => {
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  const sidebarContent = (
    <Box
      sx={{
        width: 280,
        height: '100%',
        background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        backdropFilter: 'blur(10px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Sidebar Header */}
      <Box
        sx={{
          p: 3,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: 'white',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Navigation
        </Typography>
      </Box>

      {/* Navigation Items */}
      <Box sx={{ flex: 1, pt: 2 }}>
        <List sx={{ px: 2 }}>
          {navItems.map((item) => {
            // Skip admin-only items for non-admin users
            if (item.adminOnly && !isAdmin()) return null;

            const active = isActive(item.path);

            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component={Link}
                  href={item.path}
                  onClick={handleNavClick}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    px: 2,
                    transition: 'all 0.2s ease-in-out',
                    backgroundColor: active
                      ? 'rgba(102, 126, 234, 0.2)'
                      : 'transparent',
                    border: active
                      ? '1px solid rgba(102, 126, 234, 0.3)'
                      : '1px solid transparent',
                    '&:hover': {
                      backgroundColor: active
                        ? 'rgba(102, 126, 234, 0.3)'
                        : 'rgba(255, 255, 255, 0.05)',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: active ? '#667eea' : 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    <Icon icon={item.icon} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '0.95rem',
                        fontWeight: active ? 600 : 400,
                        color: active ? 'white' : 'rgba(255, 255, 255, 0.9)',
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Sidebar Footer */}
      <Box
        sx={{
          p: 3,
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '0.75rem',
          }}
        >
          Quick Flayer v1.0
        </Typography>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        PaperProps={{
          sx: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    );
  }

  return (
    <Box
      component="aside"
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
        },
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          width: 280,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            border: 'none',
            backgroundColor: 'transparent',
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </Box>
  );
}
