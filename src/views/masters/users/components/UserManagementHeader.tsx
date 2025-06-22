'use client';

import React from 'react';

import { Box, Typography } from '@mui/material';

import { AppButton } from '@core/components/app-button';

import Icon from '@/lib/icons';
import { ICONS } from '@/lib/icons/icons-const';

interface UserManagementHeaderProps {
  onAddUser: () => void;
}

export function UserManagementHeader({ onAddUser }: UserManagementHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        mb: 4,
        gap: 2,
      }}
    >
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
            fontSize: { xs: '1.75rem', sm: '2rem' },
          }}
        >
          User Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage users and their permissions
        </Typography>
      </Box>
      <AppButton
        variant="contained"
        gradient
        theme="primary"
        startIcon={<Icon icon={ICONS.ADD_USER} />}
        onClick={onAddUser}
        sx={{
          borderRadius: 2,
          px: 3,
          py: 1,
        }}
      >
        Add User
      </AppButton>
    </Box>
  );
}
