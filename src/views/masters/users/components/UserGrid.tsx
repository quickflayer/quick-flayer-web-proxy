'use client';

import React from 'react';
import { Grid } from '@mui/material';

import { User } from '@/hooks/use-user-management';
import { UserCard } from './UserCard';

interface UserGridProps {
  users: User[];
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, user: User) => void;
}

export function UserGrid({ users, onMenuOpen }: UserGridProps) {
  return (
    <Grid container spacing={3}>
      {users.map((user) => (
        <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={user.id}>
          <UserCard user={user} onMenuOpen={onMenuOpen} />
        </Grid>
      ))}
    </Grid>
  );
}
