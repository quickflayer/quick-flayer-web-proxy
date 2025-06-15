'use client';

import { useState } from 'react';

import { Box, CssBaseline } from '@mui/material';

import { Header } from '@core/layout/header';
import { Sidebar } from '@core/layout/sidebar';

import { ProtectedRoute } from '@/core/guard/ProtectedRoute';
import AuthProvider from '@/core/providers/AuthProvider';
import { useMobile } from '@/hooks/use-mobile';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMobile();

  const handleMobileMenuToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMobileMenuClose = () => {
    setMobileOpen(false);
  };

  return (
    <AuthProvider>
      <ProtectedRoute>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <CssBaseline />

          {/* Header */}
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1200,
            }}
          >
            <Header onMobileMenuToggle={handleMobileMenuToggle} />
          </Box>

          {/* Sidebar */}
          <Sidebar
            mobileOpen={mobileOpen}
            onMobileClose={handleMobileMenuClose}
          />

          {/* Main Content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              width: { sm: `calc(100% - ${isMobile ? 0 : 280}px)` },
              ml: { sm: isMobile ? 0 : '280px' },
              mt: { xs: '56px', sm: '64px' },
              minHeight: 'calc(100vh - 64px)',
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                p: { xs: 2, sm: 3, md: 4 },
                maxWidth: '100%',
                mx: 'auto',
              }}
            >
              {children}
            </Box>
          </Box>

          {/* Mobile Backdrop */}
          {isMobile && mobileOpen && (
            <Box
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1100,
              }}
              onClick={handleMobileMenuClose}
            />
          )}
        </Box>
      </ProtectedRoute>
    </AuthProvider>
  );
}
