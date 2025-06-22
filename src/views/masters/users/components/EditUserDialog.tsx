'use client';

import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { AppButton } from '@core/components/app-button';
import {
  TextFieldController,
  SelectController,
  SwitchController,
} from '@/components/field-controller';
import { User, UpdateUserRequest } from '@/hooks/use-user-management';
import { BaseOption } from '@/types';

// Form validation schema
const editUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  role: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable(),
  isActive: z.boolean(),
});

type EditUserFormData = z.infer<typeof editUserSchema>;

// Role options in BaseOption format
const roleOptions: BaseOption[] = [
  { id: 'user', name: 'User' },
  { id: 'admin', name: 'Admin' },
];

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
