import React, { forwardRef } from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;
  label: string;
  description?: string;
  error?: string;
  indeterminate?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, label, description, error, indeterminate = false, className, ...props }, ref) => {
    const baseStyles = 'h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-colors';
    const errorStyles = 'border-red-300 text-red-600 focus:ring-red-500';
    const normalStyles = 'border-gray-300';

    React.useEffect(() => {
      if (ref && typeof ref === 'object' && ref.current) {
        ref.current.indeterminate = indeterminate;
      }
    }, [ref, indeterminate]);

    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            ref={ref}
            type="checkbox"
            id={id}
            className={`${baseStyles} ${error ? errorStyles : normalStyles} ${className || ''}`}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={description ? `${id}-description` : error ? `${id}-error` : undefined}
            {...props}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor={id} className="font-medium text-gray-700 cursor-pointer">
            {label}
          </label>
          {description && (
            <p id={`${id}-description`} className="text-gray-500">
              {description}
            </p>
          )}
          {error && (
            <p className="mt-1 text-sm text-red-600 flex items-center" id={`${id}-error`}>
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

Checkbox.displayName = 'Checkbox';

export default React.memo(Checkbox);
