'use client';

import { Box, Typography } from '@mui/material';

import {
  LogoContainer,
  LogoIcon,
  SidebarHeader as StyledSidebarHeader,
} from './sidebar-styled-component';

export function SidebarHeader() {
  return (
    <StyledSidebarHeader>
      <LogoContainer>
        <LogoIcon>QF</LogoIcon>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
            Quick Flayer
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            Dashboard
          </Typography>
        </Box>
      </LogoContainer>
    </StyledSidebarHeader>
  );
}
