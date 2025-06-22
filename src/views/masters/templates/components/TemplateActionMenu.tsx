import React from 'react';

import { ListItemIcon, ListItemText } from '@mui/material';

import Icon from '@lib/icons';
import { ICONS } from '@lib/icons/icons-const';

import { Template } from '@/hooks/use-template-management';

import { StyledMenu, StyledMenuItem } from './styled-component';

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
    <StyledMenu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <StyledMenuItem onClick={handleEdit}>
        <ListItemIcon>
          <Icon icon={ICONS.EDIT_USER} sx={{ width: 20, height: 20 }} />
        </ListItemIcon>
        <ListItemText primary="Edit Template" />
      </StyledMenuItem>

      <StyledMenuItem onClick={handleDownload}>
        <ListItemIcon>
          <Icon icon={ICONS.SAVE} sx={{ width: 20, height: 20 }} />
        </ListItemIcon>
        <ListItemText primary="Download" />
      </StyledMenuItem>

      <StyledMenuItem onClick={handleDelete} className="delete-item">
        <ListItemIcon>
          <Icon
            icon={ICONS.DELETE_USER}
            color="error"
            sx={{ width: 20, height: 20 }}
          />
        </ListItemIcon>
        <ListItemText primary="Delete Template" />
      </StyledMenuItem>
    </StyledMenu>
  );
}
