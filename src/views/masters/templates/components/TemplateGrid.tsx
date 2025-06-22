import React from 'react';

import { Grid, CardContent, Typography, Box } from '@mui/material';

import Icon from '@lib/icons';
import { ICONS } from '@lib/icons/icons-const';

import { Template } from '@/hooks/use-template-management';

import {
  EmptyStateContainer,
  TemplateCard,
  TemplateImageContainer,
  TemplateImage,
  TemplateMenuButton,
  TemplateChip,
} from './styled-component';

interface TemplateGridProps {
  templates: Template[];
  onMenuOpen: (
    event: React.MouseEvent<HTMLElement>,
    template: Template
  ) => void;
}

export function TemplateGrid({ templates, onMenuOpen }: TemplateGridProps) {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (templates.length === 0) {
    return (
      <EmptyStateContainer>
        <Icon icon={ICONS.CARDS_ICON} sx={{ width: 80, height: 80, mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          No templates found
        </Typography>
        <Typography variant="body2">
          Start by uploading your first template image.
        </Typography>
      </EmptyStateContainer>
    );
  }

  return (
    <Grid container spacing={3}>
      {templates.map((template) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={template.id}>
          <TemplateCard>
            <TemplateImageContainer>
              <TemplateImage image={template.imageUrl} title={template.name} />
              <TemplateMenuButton
                onClick={(event) => onMenuOpen(event, template)}
                size="small"
              >
                <Icon icon={ICONS.MORE_VERTICAL} />
              </TemplateMenuButton>
            </TemplateImageContainer>

            <CardContent sx={{ flexGrow: 1, p: 2 }}>
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  fontSize: '1rem',
                  lineHeight: 1.3,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {template.name}
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Dimensions: {template.imageWidth} × {template.imageHeight}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Size: {formatFileSize(template.fileSize)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Created: {formatDate(template.createdAt)}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <TemplateChip
                  label={template.mimeType.split('/')[1].toUpperCase()}
                  size="small"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </TemplateCard>
        </Grid>
      ))}
    </Grid>
  );
}
