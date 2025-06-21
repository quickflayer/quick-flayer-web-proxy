'use client';

import { Box, Divider, Drawer, useTheme } from '@mui/material';

import { useMobile } from '../../hooks/use-mobile';

import { NavigationMenu } from './components/NavigationMenu';
import { SidebarContainer } from './components/sidebar-styled-component';
import { SidebarHeader } from './components/SidebarHeader';
import { UserProfile } from './components/UserProfile';

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const isMobile = useMobile();
  const theme = useTheme();

  const sidebarWidth = 280;

  const handleNavClick = () => {
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  const sidebarContent = (
    <SidebarContainer sidebarWidth={sidebarWidth}>
      <SidebarHeader />
      <NavigationMenu onNavClick={handleNavClick} />
      <Divider sx={{ mx: 2 }} />
      <UserProfile />
    </SidebarContainer>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{
          keepMounted: true,
        }}
        slotProps={{
          paper: {
            sx: {
              width: sidebarWidth,
              boxSizing: 'border-box',
              backgroundColor: theme.palette.background.paper,
            },
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
        width: sidebarWidth,
        flexShrink: 0,
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sidebarWidth,
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
