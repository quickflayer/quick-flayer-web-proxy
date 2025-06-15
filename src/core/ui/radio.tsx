import React, { forwardRef } from 'react';

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  name: string;
  value: string;
  label: string;
  description?: string;
  error?: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ name, value, label, description, error, className, ...props }, ref) => {
    const baseStyles = 'h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2';
    const errorStyles = 'border-red-300 text-red-600 focus:ring-red-500';
    const normalStyles = 'border-gray-300';

    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            ref={ref}
            type="radio"
            name={name}
            value={value}
            className={`${baseStyles} ${error ? errorStyles : normalStyles} ${className || ''}`}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={description ? `${name}-${value}-description` : undefined}
            {...props}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor={props.id} className="font-medium text-gray-700 cursor-pointer">
            {label}
          </label>
          {description && (
            <p id={`${name}-${value}-description`} className="text-gray-500">
              {description}
            </p>
          )}
          {error && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Radio.displayName = 'Radio';

export default React.memo(Radio);
