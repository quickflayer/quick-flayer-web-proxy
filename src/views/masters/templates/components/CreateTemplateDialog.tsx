import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  TextFieldController,
  FileUploadController,
} from '@/components/field-controller';

const createTemplateSchema = z.object({
  name: z
    .string()
    .min(1, 'Template name is required')
    .max(100, 'Name too long'),
  description: z.string().optional(),
  file: z
    .any()
    .refine((file) => file instanceof File, 'Image file is required'),
});

type CreateTemplateFormData = z.infer<typeof createTemplateSchema>;

interface CreateTemplateDialogProps {
  open: boolean;
  isLoading: boolean;
  onClose: () => void;
  onCreate: (data: CreateTemplateFormData) => void;
}

export function CreateTemplateDialog({
  open,
  isLoading,
  onClose,
  onCreate,
}: CreateTemplateDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTemplateFormData>({
    resolver: zodResolver(createTemplateSchema),
    defaultValues: {
      name: '',
      description: '',
      file: null,
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: CreateTemplateFormData) => {
    onCreate(data);
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
          Create New Template
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Upload an image template for your application
        </Typography>
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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

            <FileUploadController
              name="file"
              control={control}
              label="Template Image"
              isRequired
              disabled={isLoading}
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
            {isLoading ? 'Creating...' : 'Create Template'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
