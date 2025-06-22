'use client';

import React, { useMemo } from 'react';

import {
  Avatar,
  Chip,
  IconButton,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Paper,
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import { AppDataGrid } from '@/core/components/app-table';
import { User } from '@/hooks/use-user-management';
import Icon from '@/lib/icons';
import { ICONS } from '@/lib/icons/icons-const';

interface UserTableProps {
  users: User[];
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, user: User) => void;
}

export function UserTable({ users, onMenuOpen }: UserTableProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getInitials = (user: User) => {
    if (user.firstName && user.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    }
    return user.email.charAt(0).toUpperCase();
  };

  const getDisplayName = (user: User) => {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user.email;
  };

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'user',
        headerName: 'User',
        flex: 1,
        minWidth: 200,
        renderCell: (params) => {
          const user = params.row as User;
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
              <Avatar
                sx={{
                  bgcolor:
                    user.role === 'admin' ? 'primary.main' : 'secondary.main',
                  width: 40,
                  height: 40,
                  mr: 2,
                  fontSize: '0.875rem',
                }}
              >
                {getInitials(user)}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {getDisplayName(user)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ID: {user.id.slice(0, 8)}...
                </Typography>
              </Box>
            </Box>
          );
        },
      },
      {
        field: 'email',
        headerName: 'Email',
        flex: 1,
        minWidth: 200,
        renderCell: (params) => (
          <Typography variant="body2">{params.value}</Typography>
        ),
      },
      {
        field: 'role',
        headerName: 'Role',
        width: 120,
        renderCell: (params) => (
          <Chip
            label={params.value}
            color={params.value === 'admin' ? 'primary' : 'secondary'}
            size="small"
            sx={{ textTransform: 'capitalize' }}
          />
        ),
      },
      {
        field: 'isActive',
        headerName: 'Status',
        width: 120,
        renderCell: (params) => (
          <Chip
            label={params.value ? 'Active' : 'Inactive'}
            color={params.value ? 'success' : 'default'}
            size="small"
          />
        ),
      },
      {
        field: 'createdAt',
        headerName: 'Created',
        width: 130,
        renderCell: (params) => (
          <Typography variant="body2" color="text.secondary">
            {formatDate(params.value)}
          </Typography>
        ),
      },
      {
        field: 'updatedAt',
        headerName: 'Last Updated',
        width: 130,
        renderCell: (params) => (
          <Typography variant="body2" color="text.secondary">
            {formatDate(params.value)}
          </Typography>
        ),
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 80,
        sortable: false,
        renderCell: (params) => (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onMenuOpen(e, params.row as User);
            }}
            sx={{
              '&:hover': {
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
              },
            }}
          >
            <Icon icon={ICONS.MORE_VERTICAL} />
          </IconButton>
        ),
      },
    ],
    [onMenuOpen]
  );

  if (isMobile) {
    // Mobile view - show simplified cards
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {users.map((user) => (
          <Paper
            key={user.id}
            sx={{
              p: 2,
              borderRadius: 2,
              border: '1px solid #f3f4f6',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar
                sx={{
                  bgcolor:
                    user.role === 'admin' ? 'primary.main' : 'secondary.main',
                  width: 40,
                  height: 40,
                  mr: 2,
                  fontSize: '0.875rem',
                }}
              >
                {getInitials(user)}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {getDisplayName(user)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
              <IconButton size="small" onClick={(e) => onMenuOpen(e, user)}>
                <Icon icon={ICONS.MORE_VERTICAL} />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <Chip
                label={user.role}
                color={user.role === 'admin' ? 'primary' : 'secondary'}
                size="small"
                sx={{ textTransform: 'capitalize' }}
              />
              <Chip
                label={user.isActive ? 'Active' : 'Inactive'}
                color={user.isActive ? 'success' : 'default'}
                size="small"
              />
            </Box>
            <Typography variant="caption" color="text.secondary">
              Created: {formatDate(user.createdAt)}
            </Typography>
          </Paper>
        ))}
      </Box>
    );
  }

  // Desktop view - use AppDataGrid
  return (
    <AppDataGrid
      rows={users}
      columns={columns}
      getRowId={(row) => row.id}
      disableRowSelectionOnClick
      pageSizeOptions={[10, 25, 50]}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 10 },
        },
      }}
      sx={{
        border: 'none',
        height: 600,
        '& .MuiDataGrid-cell:focus': {
          outline: 'none',
        },
        '& .MuiDataGrid-row:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
      }}
      wrapperProps={{
        sx: {
          borderRadius: 2,
          border: '1px solid #f3f4f6',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        },
      }}
    />
  );
}
