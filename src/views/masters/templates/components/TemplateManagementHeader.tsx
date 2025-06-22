import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Icon } from '@iconify/react';

interface TemplateManagementHeaderProps {
  onAddTemplate: () => void;
}

export function TemplateManagementHeader({ onAddTemplate }: TemplateManagementHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4,
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2, sm: 0 },
      }}
    >
      <Box>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
          }}
        >
          Template Management
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 600 }}
        >
          Manage image templates for your application. Upload, edit, and organize template files.
        </Typography>
      </Box>

      <Button
        variant="contained"
        startIcon={<Icon icon="ic:round-add" />}
        onClick={onAddTemplate}
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 2,
          px: 3,
          py: 1.5,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            boxShadow: '0 12px 20px rgba(102, 126, 234, 0.4)',
          },
        }}
      >
        Add Template
      </Button>
    </Box>
  );
}
