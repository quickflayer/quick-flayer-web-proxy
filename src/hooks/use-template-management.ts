import http from '@lib/http';
import { logger } from '@utils/logger';

import { API_ENDPOINTS } from '@/constants';

import { useAxiosQuery, useAxiosMutation } from './use-axios-query';

// Types for template management
export interface Template {
  id: string;
  name: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  fileSize: number;
  mimeType: string;
  originalFilename: string;
  createdById: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTemplateRequest {
  name: string;
  description?: string;
  file: File;
}

export interface UpdateTemplateRequest {
  name?: string;
  description?: string;
}

export interface TemplateStatistics {
  totalTemplates: number;
  activeTemplates: number;
  totalFileSize: number;
  averageFileSize: number;
}

/**
 * Hook to fetch all templates (admin only)
 */
export function useTemplatesQuery(enabled: boolean = true) {
  return useAxiosQuery(
    ['templates', 'list'],
    () => http.get<Template[]>(API_ENDPOINTS.TEMPLATES.LIST),
    {
      enabled,
      staleTime: 2 * 60 * 1000, // 2 minutes
      refetchOnWindowFocus: false,
      onError: (error) => {
        logger.error('Templates fetch failed:', error);
      },
    }
  );
}

/**
 * Hook to fetch specific template by ID (admin only)
 */
export function useTemplateQuery(templateId: string, enabled: boolean = true) {
  return useAxiosQuery(
    ['templates', templateId],
    () => http.get<Template>(API_ENDPOINTS.TEMPLATES.GET(templateId)),
    {
      enabled: enabled && !!templateId,
      staleTime: 5 * 60 * 1000, // 5 minutes
      onError: (error) => {
        logger.error(`Template fetch failed for ID ${templateId}:`, error);
      },
    }
  );
}

/**
 * Hook for template creation mutation (admin only)
 */
export function useCreateTemplateMutation() {
  return useAxiosMutation<Template, CreateTemplateRequest>(
    (templateData) => {
      const formData = new FormData();
      formData.append('name', templateData.name);
      if (templateData.description) {
        formData.append('description', templateData.description);
      }
      formData.append('file', templateData.file);

      return http.post<Template>(API_ENDPOINTS.TEMPLATES.CREATE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    {
      onSuccess: (data, _variables) => {
        logger.log('Template created successfully:', data);
      },
      onError: (error, _variables) => {
        logger.error('Template creation failed:', error);
      },
    }
  );
}

/**
 * Hook for template update mutation (admin only)
 */
export function useUpdateTemplateMutation() {
  return useAxiosMutation<
    Template,
    { id: string; updates: UpdateTemplateRequest }
  >(
    ({ id, updates }) =>
      http.patch<Template>(API_ENDPOINTS.TEMPLATES.UPDATE(id), updates),
    {
      onSuccess: (data, _variables) => {
        logger.log('Template updated successfully:', data);
      },
      onError: (error, variables) => {
        logger.error(`Template update failed for ID ${variables.id}:`, error);
      },
    }
  );
}

/**
 * Hook for template deletion mutation (admin only)
 */
export function useDeleteTemplateMutation() {
  return useAxiosMutation<void, string>(
    (templateId) =>
      http.delete<void>(API_ENDPOINTS.TEMPLATES.DELETE(templateId)),
    {
      onSuccess: (_data, variables) => {
        logger.log('Template deleted successfully:', variables);
      },
      onError: (error, variables) => {
        logger.error(`Template deletion failed for ID ${variables}:`, error);
      },
    }
  );
}

/**
 * Hook for template image upload mutation (admin only)
 */
export function useUploadTemplateImageMutation() {
  return useAxiosMutation<
    { url: string; metadata: any },
    { templateId: string; file: File }
  >(
    ({ templateId, file }) => {
      const formData = new FormData();
      formData.append('file', file);

      return http.post<{ url: string; metadata: any }>(
        `${API_ENDPOINTS.TEMPLATES.UPDATE(templateId)}/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
    },
    {
      onSuccess: (data, variables) => {
        logger.log('Template image uploaded successfully:', {
          templateId: variables.templateId,
          data,
        });
      },
      onError: (error, variables) => {
        logger.error(
          `Template image upload failed for ID ${variables.templateId}:`,
          error
        );
      },
    }
  );
}
