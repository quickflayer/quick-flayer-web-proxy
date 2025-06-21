'use client';

import { ListItemIcon, ListItemText } from '@mui/material';

import Icon from '@/lib/icons';
import { ICONS } from '@/lib/icons/icons-const';

import { useAuth } from '../../../hooks/use-auth';
import {
  LogoutIconButton,
  UserAvatar,
  UserProfileButton,
  UserProfileContainer,
} from './sidebar-styled-component';

export function UserProfile() {
  const { user, logout } = useAuth();

  const getUserInitials = (email: string) => {
    return email.split('@')[0].slice(0, 2).toUpperCase();
  };

  return (
    <UserProfileContainer>
      <UserProfileButton>
        <ListItemIcon sx={{ minWidth: 40 }}>
          <UserAvatar>
            {user?.email ? getUserInitials(user.email) : 'U'}
          </UserAvatar>
        </ListItemIcon>
        <ListItemText
          primary={user?.email?.split('@')[0] || 'User'}
          secondary="View Profile"
          sx={{
            '& .MuiListItemText-primary': {
              fontSize: '0.875rem',
              fontWeight: 500,
            },
            '& .MuiListItemText-secondary': {
              fontSize: '0.75rem',
            },
          }}
        />
        <LogoutIconButton
          onClick={(e) => {
            e.stopPropagation();
            logout();
          }}
          size="small"
        >
          <Icon icon={ICONS.LOGOUT_ICON} style={{ fontSize: '18px' }} />
        </LogoutIconButton>
      </UserProfileButton>
    </UserProfileContainer>
  );
}
