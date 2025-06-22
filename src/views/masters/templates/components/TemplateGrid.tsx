import React from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { Template } from '@/hooks/use-template-management';

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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 300,
          textAlign: 'center',
          color: 'text.secondary',
        }}
      >
        <Icon
          icon="ic:outline-image"
          width={80}
          height={80}
          style={{ marginBottom: 16 }}
        />
        <Typography variant="h6" gutterBottom>
          No templates found
        </Typography>
        <Typography variant="body2">
          Start by uploading your first template image.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {templates.map((template) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={template.id}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height="200"
                image={template.imageUrl}
                alt={template.name}
                sx={{
                  objectFit: 'cover',
                  backgroundColor: 'grey.100',
                }}
              />
              <IconButton
                onClick={(event) => onMenuOpen(event, template)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(4px)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                  },
                }}
                size="small"
              >
                <Icon icon="ic:round-more-vert" />
              </IconButton>
            </Box>

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
                <Chip
                  label={template.mimeType.split('/')[1].toUpperCase()}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.75rem' }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
