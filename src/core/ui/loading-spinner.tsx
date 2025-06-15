import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'blue' | 'gray' | 'white' | 'red' | 'green';
  className?: string;
  text?: string;
}

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'blue', 
  className, 
  text 
}: LoadingSpinnerProps) => {
  const sizeStyles = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  const colorStyles = {
    blue: 'border-blue-600',
    gray: 'border-gray-600',
    white: 'border-white',
    red: 'border-red-600',
    green: 'border-green-600'
  };

  const textSizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  return (
    <div className={`flex items-center justify-center ${className || ''}`}>
      <div className="flex flex-col items-center">
        <div
          className={`animate-spin rounded-full border-t-2 border-b-2 ${sizeStyles[size]} ${colorStyles[color]}`}
          role="status"
          aria-label="Loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
        {text && (
          <p className={`mt-2 text-gray-600 ${textSizeStyles[size]}`}>
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

export default React.memo(LoadingSpinner);
