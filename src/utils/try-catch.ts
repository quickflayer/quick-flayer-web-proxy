import { TError, TryCatchOptions, TryCatchResult } from '@/types';

export async function tryCatch<T>({
  fn,
  logger,
  fallbackError,
  finally: finallyFn,
}: TryCatchOptions): Promise<TryCatchResult<T>> {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (err: unknown) {
    const error: TError = parseError(err, fallbackError);
    logger?.(error.message, error.data);
    return { success: false, error };
  } finally {
    finallyFn?.();
  }
}

function parseError(err: unknown, fallbackError?: string): TError {
  // Handle RTK Query errors
  if (err && typeof err === 'object' && 'data' in err) {
    const apiError = err as {
      data?: { message?: string | string[]; statusCode?: number };
    };

    if (apiError.data?.message) {
      const message = Array.isArray(apiError.data.message)
        ? apiError.data.message.join(', ')
        : apiError.data.message;

      return {
        message,
        status: apiError.data.statusCode || 400,
        data: err,
      };
    }
  }

  // Handle standard Error objects
  if (err instanceof Error) {
    return {
      message: err.message,
      status: 500,
      data: err,
    };
  }

  // Fallback for unknown errors
  return {
    message: fallbackError || 'An unexpected error occurred',
    status: 500,
    data: err,
  };
}
