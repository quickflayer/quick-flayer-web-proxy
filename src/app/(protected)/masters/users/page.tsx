'use client';

import React from 'react';
import { Container } from '@mui/material';

import { useAuth } from '@/hooks/use-auth';
import { UserManagementView } from '@/views/masters/users';
import { AccessDeniedView } from '@/views/common';

export default function UsersPage() {
  const { isAdmin } = useAuth();

  if (!isAdmin()) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 1, sm: 2 } }}>
        <AccessDeniedView />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 1, sm: 2 } }}>
      <UserManagementView />
    </Container>
  );
}
