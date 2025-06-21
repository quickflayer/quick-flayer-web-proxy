'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Avatar,
  Typography,
  Chip,
  IconButton,
} from '@mui/material';

import Icon from '@/lib/icons';
import { ICONS } from '@/lib/icons/icons-const';
import { User } from '@/hooks/use-user-management';

interface UserCardProps {
  user: User;
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, user: User) => void;
}

export function UserCard({ user, onMenuOpen }: UserCardProps) {
  return (
    <Card
      sx={{
        borderRadius: 2,
        border: '1px solid #f3f4f6',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{
              bgcolor:
                user.role === 'admin' ? 'primary.main' : 'secondary.main',
              width: 48,
              height: 48,
              mr: 2,
            }}
          >
            {(user.firstName || user.email).charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
              {user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : user.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
          <IconButton size="small" onClick={(e) => onMenuOpen(e, user)}>
            <Icon icon={ICONS.MORE_VERTICAL} />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Chip
            label={user.role}
            color={user.role === 'admin' ? 'primary' : 'secondary'}
            size="small"
            sx={{ textTransform: 'capitalize' }}
          />
          <Chip
            label={user.isActive ? 'active' : 'inactive'}
            color={user.isActive ? 'success' : 'default'}
            size="small"
            sx={{ textTransform: 'capitalize' }}
          />
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mb: 2, display: 'block' }}
        >
          Created: {new Date(user.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
}
