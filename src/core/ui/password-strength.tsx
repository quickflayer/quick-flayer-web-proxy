import React, { useMemo } from 'react';

interface PasswordStrengthProps {
  password: string;
  className?: string;
}

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

const PasswordStrength = ({ password, className }: PasswordStrengthProps) => {
  const requirements: PasswordRequirement[] = useMemo(() => [
    {
      label: 'At least 8 characters',
      test: (pwd) => pwd.length >= 8,
    },
    {
      label: 'Contains uppercase letter',
      test: (pwd) => /[A-Z]/.test(pwd),
    },
    {
      label: 'Contains lowercase letter',
      test: (pwd) => /[a-z]/.test(pwd),
    },
    {
      label: 'Contains number or special character',
      test: (pwd) => /((?=.*\d)|(?=.*\W+))/.test(pwd),
    },
  ], []);

  const passedRequirements = useMemo(() => {
    return requirements.filter(req => req.test(password));
  }, [requirements, password]);

  const strength = useMemo(() => {
    const score = passedRequirements.length;
    if (score === 0) return { label: '', color: 'gray' };
    if (score <= 1) return { label: 'Weak', color: 'red' };
    if (score <= 2) return { label: 'Fair', color: 'orange' };
    if (score <= 3) return { label: 'Good', color: 'yellow' };
    return { label: 'Strong', color: 'green' };
  }, [passedRequirements.length]);

  if (!password) return null;

  return (
    <div className={`mt-2 ${className || ''}`}>
      {/* Strength indicator */}
      <div className="flex items-center mb-2">
        <span className="text-xs text-gray-600 mr-2">Password strength:</span>
        <div className="flex space-x-1 flex-1">
          {[1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`h-1 flex-1 rounded-full ${
                level <= passedRequirements.length
                  ? strength.color === 'red'
                    ? 'bg-red-400'
                    : strength.color === 'orange'
                    ? 'bg-orange-400'
                    : strength.color === 'yellow'
                    ? 'bg-yellow-400'
                    : 'bg-green-400'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        {strength.label && (
          <span
            className={`text-xs ml-2 font-medium ${
              strength.color === 'red'
                ? 'text-red-600'
                : strength.color === 'orange'
                ? 'text-orange-600'
                : strength.color === 'yellow'
                ? 'text-yellow-600'
                : 'text-green-600'
            }`}
          >
            {strength.label}
          </span>
        )}
      </div>

      {/* Requirements checklist */}
      <div className="space-y-1">
        {requirements.map((requirement, index) => {
          const isPassed = requirement.test(password);
          return (
            <div key={index} className="flex items-center text-xs">
              <div
                className={`w-3 h-3 rounded-full mr-2 flex items-center justify-center ${
                  isPassed ? 'bg-green-100' : 'bg-gray-100'
                }`}
              >
                {isPassed ? (
                  <svg className="w-2 h-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <div className="w-1 h-1 bg-gray-400 rounded-full" />
                )}
              </div>
              <span className={isPassed ? 'text-green-600' : 'text-gray-500'}>
                {requirement.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(PasswordStrength);
