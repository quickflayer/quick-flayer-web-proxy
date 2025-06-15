/* eslint-disable no-console */
import { Any } from '@/types';

export const logger = {
  log: (message: string, ...optionalParams: Any[]) => {
    console.log(`[LOGGER] ${message}`, ...optionalParams);
  },
  error: (message: string, ...optionalParams: Any[]) => {
    console.error(`[LOGGER] ${message}`, ...optionalParams);
  },

  debug: (message: string, ...optionalParams: Any[]) => {
    console.debug(`[LOGGER] ${message}`, ...optionalParams);
  },

  warn: (message: string, ...optionalParams: Any[]) => {
    console.warn(`[LOGGER] ${message}`, ...optionalParams);
  },
};
