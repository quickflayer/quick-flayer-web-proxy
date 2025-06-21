'use client';

import { useState } from 'react';

import { CssBaseline } from '@mui/material';

import { Header } from '@core/layout/header';
import { MobileBottomNav } from '@core/layout/MobileBottomNav';
import { Sidebar } from '@core/layout/sidebar';

import { ProtectedRoute } from '@/core/guard/ProtectedRoute';
import AuthProvider from '@/core/providers/AuthProvider';
import { useMobile } from '@/hooks/use-mobile';

import {
  ContentContainer,
  ContentWrapper,
  HeaderContainer,
  LayoutContainer,
  MainContent,
} from '../../core/layout/components/layout-styled-component';
import { MobileBackdrop } from '../../core/layout/components/MobileBackdrop';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMobile();

  // Fixed sidebar width
  const sidebarWidth = isMobile ? 0 : 280;

  const handleMobileMenuToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMobileMenuClose = () => {
    setMobileOpen(false);
  };

  return (
    <AuthProvider>
      <ProtectedRoute>
        <LayoutContainer>
          <CssBaseline />

          {/* Header */}
          <HeaderContainer>
            <Header onMobileMenuToggle={handleMobileMenuToggle} />
          </HeaderContainer>

          {/* Sidebar */}
          <Sidebar
            mobileOpen={mobileOpen}
            onMobileClose={handleMobileMenuClose}
          />

          {/* Main Content */}
          <MainContent sidebarWidth={sidebarWidth}>
            <ContentContainer>
              <ContentWrapper>{children}</ContentWrapper>
            </ContentContainer>
          </MainContent>

          {/* Mobile Backdrop */}
          <MobileBackdrop
            isVisible={isMobile && mobileOpen}
            onClose={handleMobileMenuClose}
          />

          {/* Mobile Bottom Navigation */}
          <MobileBottomNav />
        </LayoutContainer>
      </ProtectedRoute>
    </AuthProvider>
  );
}
