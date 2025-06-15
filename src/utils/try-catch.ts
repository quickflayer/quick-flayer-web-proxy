import { Any, TError, TryCatchResult } from '@/types';

export async function tryCatch<T>(
  fn: () => Promise<T>,
  logger?: (message: string, ...optionalParams: Any[]) => void,
  fallbackError?: string
): Promise<TryCatchResult<T>> {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (err: unknown) {
    const error: TError = parseError(err, fallbackError);
    logger?.(error.message, error.data);
    return { success: false, error };
  }
}

function parseError(err: unknown, fallbackError?: string): TError {
  if (err instanceof Error) {
    return {
      message: err.message,
      status: 500,
      data: err,
    };
  }

  return {
    message: fallbackError || 'An unexpected error occurred',
    status: 500,
    data: err,
  };
}
