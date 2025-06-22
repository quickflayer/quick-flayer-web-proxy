'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Button,
  Box,
} from '@mui/material';

import {
  useTemplatesQuery,
  useUpdateTemplateMutation,
  useDeleteTemplateMutation,
  useCreateTemplateMutation,
  Template,
} from '@/hooks/use-template-management';
import { useToast } from '@/hooks/use-toast';
import DeleteModal from '@/components/delete-modal';

import {
  TemplateManagementHeader,
  TemplateGrid,
  TemplateActionMenu,
  EditTemplateDialog,
  CreateTemplateDialog,
} from './components';

export function TemplateManagementView() {
  const { showSuccess, showError } = useToast();

  // State for template management
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [deleteConfirmTemplate, setDeleteConfirmTemplate] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // API hooks
  const {
    data: templates,
    isLoading,
    error,
    refetch,
  } = useTemplatesQuery(true);
  const updateTemplateMutation = useUpdateTemplateMutation();
  const deleteTemplateMutation = useDeleteTemplateMutation();
  const createTemplateMutation = useCreateTemplateMutation();

  // Event handlers
  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    template: Template
  ) => {
    setMenuAnchor(event.currentTarget);
    setSelectedTemplate(template);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedTemplate(null);
  };

  const handleEditTemplate = (template: Template) => {
    setEditingTemplate(template);
    handleMenuClose();
  };

  const handleSaveTemplate = async (updates: any) => {
    if (!editingTemplate) return;

    try {
      await updateTemplateMutation.mutateAsync({
        id: editingTemplate.id,
        updates,
      });
      showSuccess('Template updated successfully');
      setEditingTemplate(null);
      refetch();
    } catch (error) {
      showError('Failed to update template');
    }
  };

  const handleDeleteTemplate = async (id: number | string) => {
    try {
      await deleteTemplateMutation.mutateAsync(id as string);
      showSuccess('Template deleted successfully');
      setDeleteConfirmTemplate(null);
      refetch();
    } catch (error) {
      showError('Failed to delete template');
    }
  };

  const handleCreateTemplate = async (templateData: any) => {
    try {
      await createTemplateMutation.mutateAsync({
        name: templateData.name,
        description: templateData.description,
        file: templateData.file, // File object from FileUploader
      });
      showSuccess('Template created successfully');
      setShowCreateDialog(false);
      refetch();
    } catch (error) {
      showError('Failed to create template');
    }
  };

  const handleDeleteClick = (template: Template) => {
    setDeleteConfirmTemplate({
      id: template.id,
      name: template.name,
    });
    handleMenuClose();
  };

  const handleRefresh = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 400,
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <>
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load templates. Please try again.
        </Alert>
        <Button variant="contained" onClick={handleRefresh}>
          Retry
        </Button>
      </>
    );
  }

  return (
    <>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4, md: 6 } }}>
          <TemplateManagementHeader
            onAddTemplate={() => setShowCreateDialog(true)}
          />
          <TemplateGrid
            templates={templates || []}
            onMenuOpen={handleMenuOpen}
          />
        </CardContent>
      </Card>

      <TemplateActionMenu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        selectedTemplate={selectedTemplate}
        onClose={handleMenuClose}
        onEdit={handleEditTemplate}
        onDelete={handleDeleteClick}
      />

      <EditTemplateDialog
        open={Boolean(editingTemplate)}
        template={editingTemplate}
        isLoading={updateTemplateMutation.isLoading}
        onClose={() => setEditingTemplate(null)}
        onSave={handleSaveTemplate}
      />

      <CreateTemplateDialog
        open={showCreateDialog}
        isLoading={createTemplateMutation.isLoading}
        onClose={() => setShowCreateDialog(false)}
        onCreate={handleCreateTemplate}
      />

      {deleteConfirmTemplate && (
        <DeleteModal
          itemToDelete={deleteConfirmTemplate}
          onClose={() => setDeleteConfirmTemplate(null)}
          onDelete={handleDeleteTemplate}
          loading={deleteTemplateMutation.isLoading}
        />
      )}
    </>
  );
}
