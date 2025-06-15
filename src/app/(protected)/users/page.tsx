'use client';

import React from 'react';

import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  Avatar,
  Chip,
  Button,
  Grid,
} from '@mui/material';

import { useAuth } from '@/hooks/use-auth';
import Icon from '@/lib/icons';
import { ICONS } from '@/lib/icons/icons-const';

export default function UsersPage() {
  const { isAdmin } = useAuth();

  // Mock user data for demonstration
  const users = [
    {
      id: 1,
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-01-15',
    },
    {
      id: 2,
      email: 'user@example.com',
      firstName: 'Regular',
      lastName: 'User',
      role: 'user',
      status: 'active',
      lastLogin: '2024-01-14',
    },
    {
      id: 3,
      email: 'inactive@example.com',
      firstName: 'Inactive',
      lastName: 'User',
      role: 'user',
      status: 'inactive',
      lastLogin: '2024-01-10',
    },
  ];

  if (!isAdmin()) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 1, sm: 2 } }}>
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
              icon={ICONS.EXCLAMATION_ANIMATED}
              sx={{ fontSize: 64, color: 'warning.main', mb: 2 }}
            />
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
              Access Denied
            </Typography>
            <Typography variant="body1" color="text.secondary">
              You don&apos;t have permission to access user management.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 1, sm: 2 } }}>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4, md: 6 } }}>
          {/* Header */}
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
                  background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
            <Button
              variant="contained"
              startIcon={<Icon icon={ICONS.USER_ICON} />}
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              Add User
            </Button>
          </Box>

          {/* Users Grid */}
          <Grid container spacing={3}>
            {users.map((user) => (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={user.id}>
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
                            user.role === 'admin'
                              ? 'primary.main'
                              : 'secondary.main',
                          width: 48,
                          height: 48,
                          mr: 2,
                        }}
                      >
                        {user.firstName.charAt(0)}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 600, mb: 0.5 }}
                        >
                          {user.firstName} {user.lastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Chip
                        label={user.role}
                        color={user.role === 'admin' ? 'primary' : 'secondary'}
                        size="small"
                        sx={{ textTransform: 'capitalize' }}
                      />
                      <Chip
                        label={user.status}
                        color={user.status === 'active' ? 'success' : 'default'}
                        size="small"
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </Box>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mb: 2, display: 'block' }}
                    >
                      Last login: {user.lastLogin}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Icon icon={ICONS.UPDATE_ANIMATED} />}
                        sx={{ flex: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        startIcon={<Icon icon={ICONS.DELETE_ANIMATED} />}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
