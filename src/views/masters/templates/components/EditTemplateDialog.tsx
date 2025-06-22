import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Avatar,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { TextFieldController } from '@/components/field-controller';
import { Template } from '@/hooks/use-template-management';

const editTemplateSchema = z.object({
  name: z
    .string()
    .min(1, 'Template name is required')
    .max(100, 'Name too long'),
  description: z.string().optional(),
});

type EditTemplateFormData = z.infer<typeof editTemplateSchema>;

interface EditTemplateDialogProps {
  open: boolean;
  template: Template | null;
  isLoading: boolean;
  onClose: () => void;
  onSave: (data: EditTemplateFormData) => void;
}

export function EditTemplateDialog({
  open,
  template,
  isLoading,
  onClose,
  onSave,
}: EditTemplateDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditTemplateFormData>({
    resolver: zodResolver(editTemplateSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  useEffect(() => {
    if (template) {
      reset({
        name: template.name,
        description: '', // Add description field to template interface if needed
      });
    }
  }, [template, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: EditTemplateFormData) => {
    onSave(data);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <DialogTitle
        sx={{
          pb: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h5" component="h2" fontWeight={600}>
          Edit Template
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Update template information
        </Typography>
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {template && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 2,
                  backgroundColor: 'grey.50',
                  borderRadius: 2,
                }}
              >
                <Avatar
                  src={template.imageUrl}
                  alt={template.name}
                  sx={{ width: 60, height: 60 }}
                  variant="rounded"
                />
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {template.originalFilename}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {template.imageWidth} × {template.imageHeight} •{' '}
                    {formatFileSize(template.fileSize)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {template.mimeType}
                  </Typography>
                </Box>
              </Box>
            )}

            <TextFieldController
              name="name"
              control={control}
              label="Template Name"
              isRequired
              disabled={isLoading}
            />

            <TextFieldController
              name="description"
              control={control}
              label="Description (Optional)"
              disabled={isLoading}
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button
            onClick={handleClose}
            disabled={isLoading}
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              textTransform: 'none',
              px: 3,
            }}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
