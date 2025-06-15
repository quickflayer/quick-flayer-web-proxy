'use client';

import React from 'react';

import { Toaster } from 'sonner';

interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        expand={true}
        richColors={true}
        closeButton={true}
        duration={5000}
        toastOptions={{
          style: {
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
          className: 'toast-custom',
        }}
        theme="light"
      />
    </>
  );
};

export default React.memo(ToastProvider);
