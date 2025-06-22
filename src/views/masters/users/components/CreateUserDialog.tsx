'use client';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { AppButton } from '@core/components/app-button';

import {
  TextFieldController,
  SelectController,
} from '@/components/field-controller';
import { CreateUserRequest } from '@/hooks/use-user-management';
import { BaseOption } from '@/types';

// Form validation schema
const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  role: z
    .object({
      id: z.union([z.string(), z.number()]).optional(),
      name: z.string().optional(),
    })
    .nullable(),
});

type CreateUserFormData = z.infer<typeof createUserSchema>;

interface CreateUserDialogProps {
  open: boolean;
  isLoading: boolean;
  onClose: () => void;
  onCreate: (userData: CreateUserRequest) => void;
}

// Role options in BaseOption format
const roleOptions: BaseOption[] = [
  { id: 'user', name: 'User' },
  { id: 'admin', name: 'Admin' },
];

export function CreateUserDialog({
  open,
  isLoading,
  onClose,
  onCreate,
}: CreateUserDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      role: null,
    },
    mode: 'onChange',
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: CreateUserFormData) => {
    const userData: CreateUserRequest = {
      email: data.email,
      password: data.password,
      firstName: data.firstName || undefined,
      lastName: data.lastName || undefined,
      role: (data.role?.id as 'admin' | 'user') || 'user',
    };
    onCreate(userData);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New User</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ pt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextFieldController
            name="email"
            control={control}
            label="Email"
            type="email"
            isRequired
            fullWidth
          />

          <TextFieldController
            name="password"
            control={control}
            label="Password"
            type="password"
            isRequired
            helperText="Minimum 8 characters"
            fullWidth
          />

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
        </Box>
      </DialogContent>
      <DialogActions>
        <AppButton onClick={handleClose}>Cancel</AppButton>
        <AppButton
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          disabled={isLoading || !isValid}
        >
          {isLoading ? 'Creating...' : 'Create User'}
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}
