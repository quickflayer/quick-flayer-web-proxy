import { useCallback } from 'react';

import { toast } from 'sonner';

import { TIMEOUTS } from '@/constants';

interface ToastOptions {
  duration?: number;
  position?:
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-center'
    | 'bottom-center';
}

interface UseToastReturn {
  showSuccess: (message: string, options?: ToastOptions) => void;
  showError: (message: string, options?: ToastOptions) => void;
  showWarning: (message: string, options?: ToastOptions) => void;
  showInfo: (message: string, options?: ToastOptions) => void;
  showLoading: (message: string) => string | number;
  dismiss: (toastId?: string | number) => void;
  dismissAll: () => void;
}

export const useToast = (): UseToastReturn => {
  const showSuccess = useCallback((message: string, options?: ToastOptions) => {
    toast.success(message, {
      duration: options?.duration || TIMEOUTS.TOAST_DURATION,
    });
  }, []);

  const showError = useCallback((message: string, options?: ToastOptions) => {
    toast.error(message, {
      duration: options?.duration || TIMEOUTS.TOAST_DURATION,
    });
  }, []);

  const showWarning = useCallback((message: string, options?: ToastOptions) => {
    toast.warning(message, {
      duration: options?.duration || TIMEOUTS.TOAST_DURATION,
    });
  }, []);

  const showInfo = useCallback((message: string, options?: ToastOptions) => {
    toast.info(message, {
      duration: options?.duration || TIMEOUTS.TOAST_DURATION,
    });
  }, []);

  const showLoading = useCallback((message: string) => {
    return toast.loading(message);
  }, []);

  const dismiss = useCallback((toastId?: string | number) => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  }, []);

  const dismissAll = useCallback(() => {
    toast.dismiss();
  }, []);

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    dismiss,
    dismissAll,
  };
};
