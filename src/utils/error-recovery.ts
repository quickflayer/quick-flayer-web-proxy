import { logger } from './logger';
import { tryCatch } from './try-catch';

export interface RetryOptions {
  maxAttempts?: number;
  baseDelay?: number;
  maxDelay?: number;
  backoffFactor?: number;
  retryCondition?: (error: unknown) => boolean;
  onRetry?: (attempt: number, error: unknown) => void;
  onMaxAttemptsReached?: (error: unknown) => void;
}

export interface CircuitBreakerOptions {
  failureThreshold?: number;
  resetTimeout?: number;
  monitoringPeriod?: number;
  onStateChange?: (state: CircuitBreakerState) => void;
}

export enum CircuitBreakerState {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
  HALF_OPEN = 'HALF_OPEN',
}

/**
 * Retry mechanism with exponential backoff
 */
export async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    backoffFactor = 2,
    retryCondition = () => true,
    onRetry,
    onMaxAttemptsReached,
  } = options;

  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const result = await tryCatch({
      fn: operation,
      fallbackError: `Attempt ${attempt} failed`,
    });

    if (result.success) {
      return result.data as T;
    }

    lastError = result.error.data;

    // Check if we should retry
    if (attempt === maxAttempts || !retryCondition(lastError)) {
      break;
    }

    // Calculate delay with exponential backoff
    const delay = Math.min(
      baseDelay * Math.pow(backoffFactor, attempt - 1),
      maxDelay
    );

    logger.log(`Retrying operation in ${delay}ms (attempt ${attempt}/${maxAttempts})`);
    
    onRetry?.(attempt, lastError);

    // Wait before retrying
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  onMaxAttemptsReached?.(lastError);
  throw lastError;
}

/**
 * Circuit breaker pattern implementation
 */
export class CircuitBreaker {
  private state: CircuitBreakerState = CircuitBreakerState.CLOSED;
  private failureCount = 0;
  private lastFailureTime = 0;
  private successCount = 0;

  constructor(private options: CircuitBreakerOptions = {}) {}

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    const {
      failureThreshold = 5,
      resetTimeout = 60000,
      monitoringPeriod = 10000,
      onStateChange,
    } = this.options;

    // Check if circuit should be reset
    if (
      this.state === CircuitBreakerState.OPEN &&
      Date.now() - this.lastFailureTime > resetTimeout
    ) {
      this.setState(CircuitBreakerState.HALF_OPEN, onStateChange);
      this.successCount = 0;
    }

    // Reject immediately if circuit is open
    if (this.state === CircuitBreakerState.OPEN) {
      throw new Error('Circuit breaker is OPEN - operation rejected');
    }

    try {
      const result = await operation();
      this.onSuccess(onStateChange);
      return result;
    } catch (error) {
      this.onFailure(failureThreshold, onStateChange);
      throw error;
    }
  }

  private onSuccess(onStateChange?: (state: CircuitBreakerState) => void) {
    this.failureCount = 0;
    this.successCount++;

    if (this.state === CircuitBreakerState.HALF_OPEN && this.successCount >= 3) {
      this.setState(CircuitBreakerState.CLOSED, onStateChange);
    }
  }

  private onFailure(
    failureThreshold: number,
    onStateChange?: (state: CircuitBreakerState) => void
  ) {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.failureCount >= failureThreshold) {
      this.setState(CircuitBreakerState.OPEN, onStateChange);
    }
  }

  private setState(
    newState: CircuitBreakerState,
    onStateChange?: (state: CircuitBreakerState) => void
  ) {
    if (this.state !== newState) {
      logger.log(`Circuit breaker state changed: ${this.state} -> ${newState}`);
      this.state = newState;
      onStateChange?.(newState);
    }
  }

  getState(): CircuitBreakerState {
    return this.state;
  }

  getFailureCount(): number {
    return this.failureCount;
  }

  reset() {
    this.state = CircuitBreakerState.CLOSED;
    this.failureCount = 0;
    this.successCount = 0;
    this.lastFailureTime = 0;
  }
}

/**
 * Timeout wrapper for operations
 */
export async function withTimeout<T>(
  operation: () => Promise<T>,
  timeoutMs: number,
  timeoutMessage = 'Operation timed out'
): Promise<T> {
  return Promise.race([
    operation(),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs)
    ),
  ]);
}

/**
 * Debounced retry mechanism
 */
export function createDebouncedRetry<T extends unknown[]>(
  operation: (...args: T) => Promise<unknown>,
  delay = 300
) {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: T): Promise<unknown> => {
    return new Promise((resolve, reject) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(async () => {
        try {
          const result = await operation(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };
}

/**
 * Bulk retry for multiple operations
 */
export async function retryBulkOperations<T>(
  operations: Array<() => Promise<T>>,
  options: RetryOptions = {}
): Promise<Array<{ success: boolean; data?: T; error?: unknown }>> {
  const results = await Promise.allSettled(
    operations.map(operation => retryWithBackoff(operation, options))
  );

  return results.map(result => {
    if (result.status === 'fulfilled') {
      return { success: true, data: result.value };
    } else {
      return { success: false, error: result.reason };
    }
  });
}

/**
 * Error recovery strategies
 */
export const ErrorRecoveryStrategies = {
  /**
   * Network error recovery
   */
  network: {
    retryCondition: (error: unknown) => {
      if (error instanceof Error) {
        const message = error.message.toLowerCase();
        return (
          message.includes('network') ||
          message.includes('fetch') ||
          message.includes('timeout') ||
          message.includes('connection')
        );
      }
      return false;
    },
    maxAttempts: 3,
    baseDelay: 1000,
    backoffFactor: 2,
  },

  /**
   * Authentication error recovery
   */
  auth: {
    retryCondition: (error: unknown) => {
      if (error instanceof Error) {
        const message = error.message.toLowerCase();
        return !message.includes('unauthorized') && !message.includes('forbidden');
      }
      return false;
    },
    maxAttempts: 1,
    baseDelay: 500,
  },

  /**
   * Server error recovery
   */
  server: {
    retryCondition: (error: unknown) => {
      if (error instanceof Error) {
        const message = error.message.toLowerCase();
        return (
          message.includes('500') ||
          message.includes('502') ||
          message.includes('503') ||
          message.includes('504')
        );
      }
      return false;
    },
    maxAttempts: 5,
    baseDelay: 2000,
    backoffFactor: 1.5,
  },
};

/**
 * Auto-recovery hook for React components
 */
export function createAutoRecovery<T>(
  operation: () => Promise<T>,
  strategy: keyof typeof ErrorRecoveryStrategies = 'network'
) {
  const strategyOptions = ErrorRecoveryStrategies[strategy];

  return {
    execute: () => retryWithBackoff(operation, strategyOptions),
    executeWithCircuitBreaker: (circuitBreaker: CircuitBreaker) =>
      circuitBreaker.execute(() => retryWithBackoff(operation, strategyOptions)),
  };
}
