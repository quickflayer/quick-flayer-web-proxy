'use client';

import React, { useState } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from '@mui/material';

import { AppButton } from '@core/components/app-button';
import { AppTextField, AppSelectField } from '@core/components/app-inputs';

import { CreateUserRequest } from '@/hooks/use-user-management';

interface CreateUserDialogProps {
  open: boolean;
  isLoading: boolean;
  onClose: () => void;
  onCreate: (userData: CreateUserRequest) => void;
}

export function CreateUserDialog({
  open,
  isLoading,
  onClose,
  onCreate,
}: CreateUserDialogProps) {
  const [formData, setFormData] = useState<CreateUserRequest>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'user',
  });

  const handleCreate = () => {
    onCreate(formData);
  };

  const handleClose = () => {
    onClose();
    // Reset form when closing
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      role: 'user',
    });
  };

  const isFormValid =
    formData.email && formData.password && formData.password.length >= 8;

  const roleOptions = [
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' },
  ];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New User</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <AppTextField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            fullWidth
            required
          />

          <AppTextField
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            fullWidth
            required
            helperText="Minimum 8 characters"
          />

          <AppTextField
            label="First Name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            fullWidth
          />

          <AppTextField
            label="Last Name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            fullWidth
          />

          <AppSelectField
            label="Role"
            value={formData.role}
            onChange={(e) =>
              setFormData({
                ...formData,
                role: e.target.value as 'admin' | 'user',
              })
            }
            options={roleOptions}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <AppButton onClick={handleClose}>Cancel</AppButton>
        <AppButton
          onClick={handleCreate}
          variant="contained"
          disabled={isLoading || !isFormValid}
        >
          {isLoading ? 'Creating...' : 'Create User'}
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}
