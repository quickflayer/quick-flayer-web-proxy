'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Button,
  Box,
} from '@mui/material';

import {
  useUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useToggleUserStatusMutation,
  useCreateUserMutation,
  User,
} from '@/hooks/use-user-management';
import { useToast } from '@/hooks/use-toast';
import DeleteModal from '@/components/delete-modal';

import {
  UserManagementHeader,
  UserGrid,
  UserActionMenu,
  EditUserDialog,
  CreateUserDialog,
} from './components';

export function UserManagementView() {
  const { showSuccess, showError } = useToast();

  // State for user management
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteConfirmUser, setDeleteConfirmUser] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // API hooks
  const { data: users, isLoading, error, refetch } = useUsersQuery(true);
  const updateUserMutation = useUpdateUserMutation();
  const deleteUserMutation = useDeleteUserMutation();
  const toggleStatusMutation = useToggleUserStatusMutation();
  const createUserMutation = useCreateUserMutation();

  // Event handlers
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: User) => {
    setMenuAnchor(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedUser(null);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    handleMenuClose();
  };

  const handleSaveUser = async (updates: any) => {
    if (!editingUser) return;

    try {
      await updateUserMutation.mutateAsync({
        id: editingUser.id,
        updates,
      });
      showSuccess('User updated successfully');
      setEditingUser(null);
      refetch();
    } catch (error) {
      showError('Failed to update user');
    }
  };

  const handleDeleteUser = async (id: number | string) => {
    try {
      await deleteUserMutation.mutateAsync(id.toString());
      showSuccess('User deleted successfully');
      setDeleteConfirmUser(null);
      refetch();
    } catch (error) {
      showError('Failed to delete user');
    }
  };

  const handleToggleStatus = async (user: User) => {
    try {
      await toggleStatusMutation.mutateAsync(user.id);
      showSuccess(
        `User ${user.isActive ? 'deactivated' : 'activated'} successfully`
      );
      refetch();
    } catch (error) {
      showError('Failed to update user status');
    }
    handleMenuClose();
  };

  const handleCreateUser = async (userData: any) => {
    try {
      await createUserMutation.mutateAsync(userData);
      showSuccess('User created successfully');
      setShowCreateDialog(false);
      refetch();
    } catch (error) {
      showError('Failed to create user');
    }
  };

  const handleDeleteClick = (user: User) => {
    setDeleteConfirmUser({
      id: parseInt(user.id) || 0,
      name:
        user.firstName && user.lastName
          ? `${user.firstName} ${user.lastName}`
          : user.email,
    });
    handleMenuClose();
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 400,
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <>
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load users. Please try again.
        </Alert>
        <Button variant="contained" onClick={() => refetch()}>
          Retry
        </Button>
      </>
    );
  }

  return (
    <>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4, md: 6 } }}>
          <UserManagementHeader onAddUser={() => setShowCreateDialog(true)} />
          <UserGrid users={users || []} onMenuOpen={handleMenuOpen} />
        </CardContent>
      </Card>

      <UserActionMenu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        selectedUser={selectedUser}
        onClose={handleMenuClose}
        onEdit={handleEditUser}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDeleteClick}
      />

      <EditUserDialog
        open={Boolean(editingUser)}
        user={editingUser}
        isLoading={updateUserMutation.isLoading}
        onClose={() => setEditingUser(null)}
        onSave={handleSaveUser}
      />

      <CreateUserDialog
        open={showCreateDialog}
        isLoading={createUserMutation.isLoading}
        onClose={() => setShowCreateDialog(false)}
        onCreate={handleCreateUser}
      />

      {deleteConfirmUser && (
        <DeleteModal
          itemToDelete={deleteConfirmUser}
          onClose={() => setDeleteConfirmUser(null)}
          onDelete={handleDeleteUser}
          loading={deleteUserMutation.isLoading}
        />
      )}
    </>
  );
}
