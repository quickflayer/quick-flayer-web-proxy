'use client';

import React from 'react';

import { Card, CardContent, Typography } from '@mui/material';

import Icon from '@/lib/icons';
import { ICONS } from '@/lib/icons/icons-const';

export function AccessDeniedView() {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <CardContent sx={{ p: { xs: 3, sm: 4, md: 6 }, textAlign: 'center' }}>
        <Icon
          icon={ICONS.ERROR_TRIANGLE}
          sx={{ fontSize: 64, color: 'warning.main', mb: 2 }}
        />
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
          Access Denied
        </Typography>
        <Typography variant="body1" color="text.secondary">
          You don&apos;t have permission to access this resource.
        </Typography>
      </CardContent>
    </Card>
  );
}
