'use client';

import React, { useState } from 'react';

import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  Grid,
  Avatar,
  TextField,
} from '@mui/material';

import Icon from '@/lib/icons';
import { ICONS } from '@/lib/icons/icons-const';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { user } = useAuth();
  const { showSuccess } = useToast();
  
  // Settings state
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    darkMode: false,
    autoSave: true,
  });

  const [profile, setProfile] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleProfileChange = (field: keyof typeof profile) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfile(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSaveSettings = () => {
    showSuccess('Settings saved successfully!');
  };

  const handleSaveProfile = () => {
    showSuccess('Profile updated successfully!');
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 1, sm: 2 } }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 3,
          fontSize: { xs: '1.75rem', sm: '2rem' },
        }}
      >
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Settings */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  sx={{
                    bgcolor: 'primary.main',
                    width: 48,
                    height: 48,
                    mr: 2,
                  }}
                >
                  <Icon icon={ICONS.USER_ICON} />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Profile Information
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  label="First Name"
                  value={profile.firstName}
                  onChange={handleProfileChange('firstName')}
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  label="Last Name"
                  value={profile.lastName}
                  onChange={handleProfileChange('lastName')}
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  label="Email"
                  value={profile.email}
                  onChange={handleProfileChange('email')}
                  fullWidth
                  variant="outlined"
                  type="email"
                />
                <Button
                  variant="contained"
                  onClick={handleSaveProfile}
                  startIcon={<Icon icon={ICONS.SUCCESS_ANIMATED} />}
                  sx={{
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}
                >
                  Save Profile
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Application Settings */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  sx={{
                    bgcolor: 'secondary.main',
                    width: 48,
                    height: 48,
                    mr: 2,
                  }}
                >
                  <Icon icon={ICONS.SETTINGS_ICON} />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Application Settings
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications}
                      onChange={() => handleSettingChange('notifications')}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        Push Notifications
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Receive notifications for important updates
                      </Typography>
                    </Box>
                  }
                />

                <Divider />

                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.emailUpdates}
                      onChange={() => handleSettingChange('emailUpdates')}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        Email Updates
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Receive email notifications for account activity
                      </Typography>
                    </Box>
                  }
                />

                <Divider />

                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.darkMode}
                      onChange={() => handleSettingChange('darkMode')}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        Dark Mode
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Switch to dark theme (coming soon)
                      </Typography>
                    </Box>
                  }
                />

                <Divider />

                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.autoSave}
                      onChange={() => handleSettingChange('autoSave')}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        Auto Save
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Automatically save changes as you work
                      </Typography>
                    </Box>
                  }
                />

                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    onClick={handleSaveSettings}
                    startIcon={<Icon icon={ICONS.SUCCESS_ANIMATED} />}
                    fullWidth
                    sx={{
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    }}
                  >
                    Save Settings
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
