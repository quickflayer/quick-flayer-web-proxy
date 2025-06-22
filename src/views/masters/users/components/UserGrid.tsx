'use client';

import React, { useState } from 'react';
import {
  Grid,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';

import Icon from '@/lib/icons';
import { ICONS } from '@/lib/icons/icons-const';
import { User } from '@/hooks/use-user-management';
import { UserCard } from './UserCard';
import { UserTable } from './UserTable';

interface UserGridProps {
  users: User[];
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, user: User) => void;
}

export function UserGrid({ users, onMenuOpen }: UserGridProps) {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const handleViewChange = (
    _event: React.MouseEvent<HTMLElement>,
    newView: 'table' | 'grid'
  ) => {
    if (newView !== null) {
      setViewMode(newView);
    }
  };

  return (
    <Box>
      {/* View Toggle */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {users.length} user{users.length !== 1 ? 's' : ''} found
        </Typography>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewChange}
          size="small"
          sx={{
            '& .MuiToggleButton-root': {
              border: '1px solid #e5e7eb',
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              },
            },
          }}
        >
          <ToggleButton value="table" aria-label="table view">
            <Icon icon={ICONS.TABLE_VIEW} style={{ fontSize: '18px' }} />
          </ToggleButton>
          <ToggleButton value="grid" aria-label="grid view">
            <Icon icon={ICONS.GRID_VIEW} style={{ fontSize: '18px' }} />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Content */}
      {viewMode === 'table' ? (
        <UserTable users={users} onMenuOpen={onMenuOpen} />
      ) : (
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={user.id}>
              <UserCard user={user} onMenuOpen={onMenuOpen} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
