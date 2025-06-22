'use client';

import React, { useState, useEffect } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from '@mui/material';
import { FormControlLabel, Switch } from '@mui/material';

import { AppButton } from '@core/components/app-button';
import { AppTextField, AppSelectField } from '@core/components/app-inputs';

import { User, UpdateUserRequest } from '@/hooks/use-user-management';


interface EditUserDialogProps {
  open: boolean;
  user: User | null;
  isLoading: boolean;
  onClose: () => void;
  onSave: (updates: UpdateUserRequest) => void;
}

export function EditUserDialog({
  open,
  user,
  isLoading,
  onClose,
  onSave,
}: EditUserDialogProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: 'user' as 'admin' | 'user',
    isActive: true,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        role: user.role as 'admin' | 'user',
        isActive: user.isActive,
      });
    }
  }, [user]);

  const handleSave = () => {
    onSave(formData);
  };

  const handleClose = () => {
    onClose();
    // Reset form when closing
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        role: user.role as 'admin' | 'user',
        isActive: user.isActive,
      });
    }
  };

  const roleOptions = [
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' },
  ];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
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

          <FormControlLabel
            control={
              <Switch
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
              />
            }
            label="Active"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <AppButton onClick={handleClose}>Cancel</AppButton>
        <AppButton
          onClick={handleSave}
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}
