'use client';

import React from 'react';

import { Menu, MenuItem } from '@mui/material';

import { User } from '@/hooks/use-user-management';
import Icon from '@/lib/icons';
import { ICONS } from '@/lib/icons/icons-const';

interface UserActionMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  selectedUser: User | null;
  onClose: () => void;
  onEdit: (user: User) => void;
  onToggleStatus: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UserActionMenu({
  anchorEl,
  open,
  selectedUser,
  onClose,
  onEdit,
  onToggleStatus,
  onDelete,
}: UserActionMenuProps) {
  const handleEdit = () => {
    if (selectedUser) {
      onEdit(selectedUser);
    }
  };

  const handleToggleStatus = () => {
    if (selectedUser) {
      onToggleStatus(selectedUser);
    }
  };

  const handleDelete = () => {
    if (selectedUser) {
      onDelete(selectedUser);
    }
  };

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem onClick={handleEdit}>
        <Icon icon={ICONS.EDIT_USER} sx={{ mr: 1 }} />
        Edit User
      </MenuItem>
      <MenuItem onClick={handleToggleStatus}>
        <Icon icon={ICONS.TOGGLE_STATUS} sx={{ mr: 1 }} />
        {selectedUser?.isActive ? 'Deactivate' : 'Activate'}
      </MenuItem>
      <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
        <Icon icon={ICONS.DELETE_USER} sx={{ mr: 1 }} />
        Delete User
      </MenuItem>
    </Menu>
  );
}
