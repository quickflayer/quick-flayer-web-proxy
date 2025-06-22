import React from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { Icon } from '@iconify/react';
import { Template } from '@/hooks/use-template-management';

interface TemplateActionMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  selectedTemplate: Template | null;
  onClose: () => void;
  onEdit: (template: Template) => void;
  onDelete: (template: Template) => void;
}

export function TemplateActionMenu({
  anchorEl,
  open,
  selectedTemplate,
  onClose,
  onEdit,
  onDelete,
}: TemplateActionMenuProps) {
  const handleEdit = () => {
    if (selectedTemplate) {
      onEdit(selectedTemplate);
    }
  };

  const handleDelete = () => {
    if (selectedTemplate) {
      onDelete(selectedTemplate);
    }
  };

  const handleDownload = () => {
    if (selectedTemplate) {
      // Create a temporary link to download the image
      const link = document.createElement('a');
      link.href = selectedTemplate.imageUrl;
      link.download = selectedTemplate.originalFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      onClose();
    }
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 2,
          minWidth: 180,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem onClick={handleEdit}>
        <ListItemIcon>
          <Icon icon="ic:round-edit" width={20} />
        </ListItemIcon>
        <ListItemText primary="Edit Template" />
      </MenuItem>

      <MenuItem onClick={handleDownload}>
        <ListItemIcon>
          <Icon icon="ic:round-download" width={20} />
        </ListItemIcon>
        <ListItemText primary="Download" />
      </MenuItem>

      <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
        <ListItemIcon>
          <Icon icon="ic:round-delete" width={20} color="currentColor" />
        </ListItemIcon>
        <ListItemText primary="Delete Template" />
      </MenuItem>
    </Menu>
  );
}
