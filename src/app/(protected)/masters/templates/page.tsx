'use client';

import React from 'react';

import { Container } from '@mui/material';

import { useAuth } from '@/hooks/use-auth';
import { AccessDeniedView } from '@/views/common';
import { TemplateManagementView } from '@/views/masters/templates';

export default function TemplatesPage() {
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
      <TemplateManagementView />
    </Container>
  );
}
