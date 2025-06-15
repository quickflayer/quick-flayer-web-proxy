'use client';

import { useState } from 'react';

import { Box, CssBaseline } from '@mui/material';

import { Header } from '@core/layout/header';
import { MobileBottomNav } from '@core/layout/MobileBottomNav';
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
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              position: 'relative',
              overflow: 'auto',
            }}
          >
            {/* Content Container */}
            <Box
              sx={{
                p: { xs: 1, sm: 2, md: 3 },
                pb: { xs: 10, sm: 2, md: 3 }, // Extra bottom padding for mobile nav
                maxWidth: { xs: '100%', lg: '1400px' },
                mx: 'auto',
                minHeight: 'calc(100vh - 64px)',
              }}
            >
              {/* Content Wrapper */}
              <Box
                sx={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: { xs: 0, sm: 2 },
                  boxShadow: {
                    xs: 'none',
                    sm: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  },
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  minHeight: {
                    xs: 'calc(100vh - 72px)',
                    sm: 'calc(100vh - 96px)',
                  },
                  overflow: 'hidden',
                }}
              >
                {children}
              </Box>
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

          {/* Mobile Bottom Navigation */}
          <MobileBottomNav />
        </Box>
      </ProtectedRoute>
    </AuthProvider>
  );
}
