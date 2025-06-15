'use client';

import React, { useCallback } from 'react';

import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Chip,
} from '@mui/material';

import { useAuth } from '@hooks/use-auth';
import { useToast } from '@hooks/use-toast';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { showSuccess } = useToast();

  const isAdmin = user?.role === 'admin';

  const handleLogout = useCallback(() => {
    logout();
    showSuccess('You have been successfully logged out.');
  }, [logout, showSuccess]);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 1, sm: 2 } }}>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow:
            '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4, md: 6 } }}>
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
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 'bold',
                  background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                  fontSize: { xs: '1.75rem', sm: '2.5rem' },
                }}
              >
                Welcome to Quick Flayer
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  Hello, {user?.firstName || user?.email}!
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body1" color="text.secondary">
                    Role:
                  </Typography>
                  <Chip
                    label={user?.role}
                    color={isAdmin ? 'primary' : 'secondary'}
                    size="small"
                    sx={{ textTransform: 'capitalize' }}
                  />
                </Box>
              </Box>
            </Box>
            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
              startIcon={<span>🚪</span>}
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1,
                alignSelf: { xs: 'flex-start', sm: 'center' },
              }}
            >
              Logout
            </Button>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              },
              gap: 3,
            }}
          >
            <Box>
              <Card
                sx={{
                  background:
                    'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                  border: '1px solid #93c5fd',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow:
                      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      width: 48,
                      height: 48,
                      mb: 2,
                    }}
                  >
                    👤
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: 'primary.dark', mb: 1 }}
                  >
                    Profile
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Manage your account settings and preferences
                  </Typography>
                  <Button
                    variant="text"
                    size="small"
                    sx={{ color: 'primary.main', fontWeight: 600 }}
                  >
                    Edit Profile →
                  </Button>
                </CardContent>
              </Card>
            </Box>

            {isAdmin && (
              <Box>
                <Card
                  sx={{
                    background:
                      'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                    border: '1px solid #86efac',
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow:
                        '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Avatar
                      sx={{
                        bgcolor: 'success.main',
                        width: 48,
                        height: 48,
                        mb: 2,
                      }}
                    >
                      👥
                    </Avatar>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: 'success.dark', mb: 1 }}
                    >
                      User Management
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      Manage users and their permissions
                    </Typography>
                    <Button
                      variant="text"
                      size="small"
                      sx={{ color: 'success.main', fontWeight: 600 }}
                    >
                      Manage Users →
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            )}

            <Box>
              <Card
                sx={{
                  background:
                    'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
                  border: '1px solid #c4b5fd',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow:
                      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Avatar
                    sx={{
                      bgcolor: 'secondary.main',
                      width: 48,
                      height: 48,
                      mb: 2,
                    }}
                  >
                    📊
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: 'secondary.dark', mb: 1 }}
                  >
                    Analytics
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    View your activity and usage statistics
                  </Typography>
                  <Button
                    variant="text"
                    size="small"
                    sx={{ color: 'secondary.main', fontWeight: 600 }}
                  >
                    View Analytics →
                  </Button>
                </CardContent>
              </Card>
            </Box>

            <Box>
              <Card
                sx={{
                  background:
                    'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)',
                  border: '1px solid #fb923c',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow:
                      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Avatar
                    sx={{
                      bgcolor: 'warning.main',
                      width: 48,
                      height: 48,
                      mb: 2,
                    }}
                  >
                    ⚙️
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: 'warning.dark', mb: 1 }}
                  >
                    Settings
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Configure application preferences
                  </Typography>
                  <Button
                    variant="text"
                    size="small"
                    sx={{ color: 'warning.main', fontWeight: 600 }}
                  >
                    Open Settings →
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
