'use client';

import {
  Menu,
  MenuItem,
  Card,
  CardMedia,
  IconButton,
  Box,
  Chip,
  styled,
} from '@mui/material';

export const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: theme.spacing(2),
    minWidth: 180,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
  },
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  borderRadius: theme.spacing(1),
  margin: theme.spacing(0.5, 1),
  transition: 'all 0.2s ease-in-out',

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translateX(4px)',
  },

  '&.delete-item': {
    color: theme.palette.error.main,

    '&:hover': {
      backgroundColor: theme.palette.error.light + '20',
    },
  },
}));

// Template Grid Components
export const EmptyStateContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 300,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const TemplateCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',

  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  },
}));

export const TemplateImageContainer = styled(Box)(() => ({
  position: 'relative',
}));

export const TemplateImage = styled(CardMedia)(() => ({
  height: 200,
  objectFit: 'cover',
  backgroundColor: '#f5f5f5',
}));

export const TemplateMenuButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(4px)',

  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
}));

export const TemplateChip = styled(Chip)(({ theme }) => ({
  fontSize: '0.75rem',
  height: theme.spacing(3),
}));
