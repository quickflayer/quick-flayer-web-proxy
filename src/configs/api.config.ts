import { TIMEOUTS } from '@/constants';

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  TIMEOUT: TIMEOUTS.API_REQUEST,
} as const;
