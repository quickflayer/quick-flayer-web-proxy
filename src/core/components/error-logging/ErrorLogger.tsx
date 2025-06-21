'use client';

import { useEffect } from 'react';

import { logger } from '@/utils/logger';

interface ErrorReport {
  id: string;
  timestamp: string;
  message: string;
  stack?: string;
  userAgent: string;
  url: string;
  userId?: string;
  sessionId?: string;
  buildVersion?: string;
  errorBoundary?: boolean;
  componentStack?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'javascript' | 'network' | 'auth' | 'ui' | 'api' | 'unknown';
  metadata?: Record<string, unknown>;
}

export interface ErrorLoggerProps {
  userId?: string;
  sessionId?: string;
  buildVersion?: string;
  enableRemoteLogging?: boolean;
  remoteEndpoint?: string;
  enableLocalStorage?: boolean;
  maxLocalErrors?: number;
  enableConsoleLogging?: boolean;
  enablePerformanceTracking?: boolean;
}

class ErrorReporter {
  private static instance: ErrorReporter;
  private config: Required<ErrorLoggerProps>;
  private errorQueue: ErrorReport[] = [];
  private isOnline = true;

  private constructor(config: ErrorLoggerProps) {
    this.config = {
      userId: config.userId || 'anonymous',
      sessionId: config.sessionId || this.generateSessionId(),
      buildVersion: config.buildVersion || 'unknown',
      enableRemoteLogging: config.enableRemoteLogging ?? true,
      remoteEndpoint: config.remoteEndpoint || '/api/errors',
      enableLocalStorage: config.enableLocalStorage ?? true,
      maxLocalErrors: config.maxLocalErrors || 100,
      enableConsoleLogging: config.enableConsoleLogging ?? true,
      enablePerformanceTracking: config.enablePerformanceTracking ?? true,
    };

    this.setupEventListeners();
    this.loadStoredErrors();
  }

  static getInstance(config?: ErrorLoggerProps): ErrorReporter {
    if (!ErrorReporter.instance && config) {
      ErrorReporter.instance = new ErrorReporter(config);
    }
    return ErrorReporter.instance;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private setupEventListeners() {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.reportError({
        message: event.message,
        stack: event.error?.stack,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        severity: 'high',
        category: 'javascript',
      });
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.reportError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        severity: 'high',
        category: 'javascript',
        metadata: { reason: event.reason },
      });
    });

    // Network status monitoring
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.flushErrorQueue();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });

    // Performance monitoring
    if (this.config.enablePerformanceTracking) {
      this.setupPerformanceMonitoring();
    }
  }

  private setupPerformanceMonitoring() {
    // Monitor long tasks
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.duration > 50) {
              // Tasks longer than 50ms
              this.reportError({
                message: `Long task detected: ${entry.duration}ms`,
                severity: 'medium',
                category: 'ui',
                metadata: {
                  duration: entry.duration,
                  startTime: entry.startTime,
                  entryType: entry.entryType,
                },
              });
            }
          });
        });
        observer.observe({ entryTypes: ['longtask'] });
      } catch (error) {
        logger.warn('Performance monitoring not supported:', error);
      }
    }
  }

  reportError(errorData: {
    message: string;
    stack?: string;
    filename?: string;
    lineno?: number;
    colno?: number;
    severity: ErrorReport['severity'];
    category: ErrorReport['category'];
    metadata?: Record<string, unknown>;
    componentStack?: string;
    errorBoundary?: boolean;
  }) {
    const errorReport: ErrorReport = {
      id: this.generateErrorId(),
      timestamp: new Date().toISOString(),
      message: errorData.message,
      stack: errorData.stack,
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId: this.config.userId,
      sessionId: this.config.sessionId,
      buildVersion: this.config.buildVersion,
      severity: errorData.severity,
      category: errorData.category,
      metadata: {
        ...errorData.metadata,
        filename: errorData.filename,
        lineno: errorData.lineno,
        colno: errorData.colno,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        timestamp: Date.now(),
      },
      componentStack: errorData.componentStack,
      errorBoundary: errorData.errorBoundary,
    };

    // Console logging
    if (this.config.enableConsoleLogging) {
      this.logToConsole(errorReport);
    }

    // Store locally
    if (this.config.enableLocalStorage) {
      this.storeErrorLocally(errorReport);
    }

    // Queue for remote logging
    if (this.config.enableRemoteLogging) {
      this.queueForRemoteLogging(errorReport);
    }
  }

  private generateErrorId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private logToConsole(error: ErrorReport) {
    const style = this.getConsoleStyle(error.severity);
    logger.error(
      `%c[${error.severity.toUpperCase()}] ${error.category.toUpperCase()}: ${error.message}`,
      style,
      {
        id: error.id,
        timestamp: error.timestamp,
        stack: error.stack,
        metadata: error.metadata,
      }
    );
  }

  private getConsoleStyle(severity: ErrorReport['severity']): string {
    const styles = {
      low: 'color: #2196F3; font-weight: bold;',
      medium: 'color: #FF9800; font-weight: bold;',
      high: 'color: #F44336; font-weight: bold;',
      critical:
        'color: #FFFFFF; background-color: #F44336; font-weight: bold; padding: 2px 4px;',
    };
    return styles[severity];
  }

  private storeErrorLocally(error: ErrorReport) {
    try {
      const stored = localStorage.getItem('error_logs');
      const errors: ErrorReport[] = stored ? JSON.parse(stored) : [];

      errors.push(error);

      // Keep only the most recent errors
      if (errors.length > this.config.maxLocalErrors) {
        errors.splice(0, errors.length - this.config.maxLocalErrors);
      }

      localStorage.setItem('error_logs', JSON.stringify(errors));
    } catch (storageError) {
      logger.warn('Failed to store error locally:', storageError);
    }
  }

  private loadStoredErrors() {
    try {
      const stored = localStorage.getItem('error_logs');
      if (stored) {
        const errors: ErrorReport[] = JSON.parse(stored);
        this.errorQueue.push(...errors);
        localStorage.removeItem('error_logs'); // Clear after loading
      }
    } catch (error) {
      logger.warn('Failed to load stored errors:', error);
    }
  }

  private queueForRemoteLogging(error: ErrorReport) {
    this.errorQueue.push(error);

    if (this.isOnline) {
      this.flushErrorQueue();
    }
  }

  private async flushErrorQueue() {
    if (this.errorQueue.length === 0 || !this.isOnline) {
      return;
    }

    const errorsToSend = [...this.errorQueue];
    this.errorQueue = [];

    try {
      await fetch(this.config.remoteEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          errors: errorsToSend,
          sessionInfo: {
            sessionId: this.config.sessionId,
            userId: this.config.userId,
            buildVersion: this.config.buildVersion,
            timestamp: new Date().toISOString(),
          },
        }),
      });

      logger.log(`Successfully sent ${errorsToSend.length} error reports`);
    } catch (sendError) {
      logger.warn('Failed to send error reports:', sendError);
      // Re-queue errors for retry
      this.errorQueue.unshift(...errorsToSend);
    }
  }

  getStoredErrors(): ErrorReport[] {
    try {
      const stored = localStorage.getItem('error_logs');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      logger.warn('Failed to get stored errors:', error);
      return [];
    }
  }

  clearStoredErrors() {
    try {
      localStorage.removeItem('error_logs');
      this.errorQueue = [];
    } catch (error) {
      logger.warn('Failed to clear stored errors:', error);
    }
  }

  updateConfig(newConfig: Partial<ErrorLoggerProps>) {
    this.config = { ...this.config, ...newConfig };
  }
}

export default function ErrorLogger(props: ErrorLoggerProps) {
  useEffect(() => {
    const reporter = ErrorReporter.getInstance(props);

    // Report component mount
    reporter.reportError({
      message: 'ErrorLogger component mounted',
      severity: 'low',
      category: 'ui',
      metadata: { component: 'ErrorLogger' },
    });

    return () => {
      // Report component unmount
      reporter.reportError({
        message: 'ErrorLogger component unmounted',
        severity: 'low',
        category: 'ui',
        metadata: { component: 'ErrorLogger' },
      });
    };
  }, [props]);

  return null; // This component doesn't render anything
}

// Export the reporter instance for manual error reporting
export const reportError = (
  errorData: Parameters<ErrorReporter['reportError']>[0]
) => {
  const reporter = ErrorReporter.getInstance();
  if (reporter) {
    reporter.reportError(errorData);
  }
};

// Export utility functions
export const getStoredErrors = () => {
  const reporter = ErrorReporter.getInstance();
  return reporter ? reporter.getStoredErrors() : [];
};

export const clearStoredErrors = () => {
  const reporter = ErrorReporter.getInstance();
  if (reporter) {
    reporter.clearStoredErrors();
  }
};
