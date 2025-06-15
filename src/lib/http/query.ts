import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { AxiosError, AxiosRequestConfig } from 'axios';

import { tryCatch } from '@/utils/try-catch';

import http from '.';

const query =
  (): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    const result = await tryCatch({
      fn: async () => {
        const response = await http({ url, method, data, params });
        return { data: response.data };
      },
      fallbackError: 'HTTP request failed',
    });

    if (result.success) {
      return result.data as { data: unknown };
    } else {
      const err = result.error.data as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default query;
