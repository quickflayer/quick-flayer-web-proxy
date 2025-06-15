import React from 'react';

interface ErrorMessageProps {
  error: string | Error | { message: string } | null;
  title?: string;
  className?: string;
  variant?: 'inline' | 'card' | 'banner';
  onRetry?: () => void;
  showIcon?: boolean;
}

const ErrorMessage = ({ 
  error, 
  title = 'Error', 
  className, 
  variant = 'card',
  onRetry,
  showIcon = true
}: ErrorMessageProps) => {
  if (!error) return null;

  const errorMessage = typeof error === 'string' 
    ? error 
    : error instanceof Error 
    ? error.message 
    : error.message || 'An unexpected error occurred';

  const baseStyles = 'text-red-600';
  
  const variantStyles = {
    inline: 'text-sm',
    card: 'p-4 bg-red-50 border border-red-200 rounded-lg',
    banner: 'p-4 bg-red-100 border-l-4 border-red-500'
  };

  const iconSvg = (
    <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  );

  if (variant === 'inline') {
    return (
      <div className={`flex items-center ${baseStyles} ${variantStyles[variant]} ${className || ''}`}>
        {showIcon && iconSvg}
        <span className={showIcon ? 'ml-2' : ''}>{errorMessage}</span>
      </div>
    );
  }

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className || ''}`}>
      <div className="flex items-start">
        {showIcon && (
          <div className="flex-shrink-0">
            {iconSvg}
          </div>
        )}
        <div className={showIcon ? 'ml-3' : ''}>
          {title && variant !== 'inline' && (
            <h3 className="text-sm font-medium text-red-800 mb-1">
              {title}
            </h3>
          )}
          <p className="text-sm text-red-700">
            {errorMessage}
          </p>
          {onRetry && (
            <div className="mt-3">
              <button
                type="button"
                onClick={onRetry}
                className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded-md hover:bg-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ErrorMessage);
