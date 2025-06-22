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
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      role: null,
      isActive: true,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (user) {
      const userRole = roleOptions.find((option) => option.id === user.role);
      reset({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        role: userRole || null,
        isActive: user.isActive,
      });
    }
  }, [user, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: EditUserFormData) => {
    const updateData: UpdateUserRequest = {
      firstName: data.firstName || undefined,
      lastName: data.lastName || undefined,
      role: (data.role?.id as 'admin' | 'user') || undefined,
      isActive: data.isActive,
    };
    onSave(updateData);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ pt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextFieldController
            name="firstName"
            control={control}
            label="First Name"
            fullWidth
          />

          <TextFieldController
            name="lastName"
            control={control}
            label="Last Name"
            fullWidth
          />

          <SelectController
            name="role"
            control={control}
            label="Role"
            options={roleOptions}
          />

          <SwitchController name="isActive" control={control} label="Active" />
        </Box>
      </DialogContent>
      <DialogActions>
        <AppButton onClick={handleClose}>Cancel</AppButton>
        <AppButton
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          disabled={isLoading || !isValid}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}
