import React, { useState, useCallback, useMemo, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import Button from '@core/ui/button';
import Input from '@core/ui/input';
import Select from '@core/ui/select';
import Checkbox from '@core/ui/checkbox';
import Radio from '@core/ui/radio';
import Textarea from '@core/ui/textarea';
import LoadingSpinner from '@core/ui/loading-spinner';

import { useAuth } from '@hooks/use-auth';
import { API_ENDPOINTS, ERROR_MESSAGES, VALIDATION } from '@/constants';
import { logger } from '@utils/logger';
import { tryCatch } from '@utils/try-catch';

// Props interface following naming conventions
interface ExampleFormProps {
  initialData?: FormData;
  onSubmit: (data: FormData) => Promise<void>;
  onCancel?: () => void;
  isReadOnly?: boolean;
}

// Form data interface
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  bio: string;
  notifications: boolean;
  terms: boolean;
}

// Component following all patterns from BASE_PROMPT.md
const ExampleForm = ({
  initialData,
  onSubmit,
  onCancel,
  isReadOnly = false,
}: ExampleFormProps) => {
  // State hooks
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState(initialData?.role || '');

  // Custom hooks
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<FormData>({
    defaultValues: initialData || {
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      department: '',
      bio: '',
      notifications: false,
      terms: false,
    },
  });

  // Watch form values for dependent logic
  const watchedRole = watch('role');
  const watchedEmail = watch('email');

  // Memoized values - expensive computations
  const departmentOptions = useMemo(() => {
    const baseDepartments = [
      { value: 'engineering', label: 'Engineering' },
      { value: 'design', label: 'Design' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'sales', label: 'Sales' },
    ];

    // Filter departments based on role
    if (watchedRole === 'admin') {
      return [...baseDepartments, { value: 'management', label: 'Management' }];
    }

    return baseDepartments;
  }, [watchedRole]);

  const isFormValid = useMemo(() => {
    return (
      watchedEmail &&
      VALIDATION.EMAIL_REGEX.test(watchedEmail) &&
      Object.keys(errors).length === 0
    );
  }, [watchedEmail, errors]);

  // Callbacks - event handlers
  const handleFormSubmit = useCallback(
    async (data: FormData) => {
      setIsSubmitting(true);
      setSubmitError(null);

      const result = await tryCatch({
        fn: async () => {
          logger.log('Submitting form data:', data);
          await onSubmit(data);
        },
        logger: logger.error,
        fallbackError: 'Form submission failed',
        finally: () => setIsSubmitting(false),
      });

      if (result.success) {
        logger.log('Form submitted successfully');
        reset();
      } else {
        logger.error('Form submission failed:', result.error);
        setSubmitError(result.error.message || ERROR_MESSAGES.UNKNOWN_ERROR);
      }

      setIsSubmitting(false);
    },
    [onSubmit, reset]
  );

  const handleCancel = useCallback(() => {
    logger.log('Form cancelled');
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  }, [onCancel, router]);

  const handleRoleChange = useCallback(
    (value: string) => {
      setSelectedRole(value);
      setValue('role', value);

      // Reset department when role changes
      setValue('department', '');

      logger.log('Role changed to:', value);
    },
    [setValue]
  );

  // Effects
  useEffect(() => {
    if (!isAuthenticated) {
      logger.warn('User not authenticated, redirecting to login');
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (initialData) {
      reset(initialData);
      setSelectedRole(initialData.role);
    }
  }, [initialData, reset]);

  // Early returns for loading/error states
  if (!isAuthenticated) {
    return <LoadingSpinner size="lg" text="Checking authentication..." />;
  }

  // Main render
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {isReadOnly ? 'View Profile' : 'Edit Profile'}
        </h1>
        <p className="text-gray-600">
          {isReadOnly
            ? 'View your profile information'
            : 'Update your profile information below'}
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Name fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="firstName"
            label="First Name"
            type="text"
            placeholder="John"
            error={errors.firstName?.message}
            disabled={isReadOnly}
            {...register('firstName', {
              required: 'First name is required',
              minLength: {
                value: VALIDATION.NAME_MIN_LENGTH,
                message: `First name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`,
              },
            })}
          />

          <Input
            id="lastName"
            label="Last Name"
            type="text"
            placeholder="Doe"
            error={errors.lastName?.message}
            disabled={isReadOnly}
            {...register('lastName', {
              required: 'Last name is required',
              minLength: {
                value: VALIDATION.NAME_MIN_LENGTH,
                message: `Last name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`,
              },
            })}
          />
        </div>

        {/* Email field */}
        <Input
          id="email"
          label="Email Address"
          type="email"
          placeholder="john.doe@example.com"
          error={errors.email?.message}
          disabled={isReadOnly}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: VALIDATION.EMAIL_REGEX,
              message: 'Please enter a valid email address',
            },
          })}
        />

        {/* Role selection */}
        <div>
          <fieldset>
            <legend className="text-sm font-semibold text-gray-700 mb-3">
              Role
            </legend>
            <div className="space-y-2">
              <Radio
                name="role"
                value="user"
                label="User"
                description="Standard user access"
                checked={selectedRole === 'user'}
                onChange={() => handleRoleChange('user')}
                disabled={isReadOnly}
              />
              <Radio
                name="role"
                value="admin"
                label="Administrator"
                description="Full system access"
                checked={selectedRole === 'admin'}
                onChange={() => handleRoleChange('admin')}
                disabled={isReadOnly}
              />
            </div>
          </fieldset>
        </div>

        {/* Department selection */}
        <Select
          id="department"
          label="Department"
          options={departmentOptions}
          placeholder="Select a department"
          error={errors.department?.message}
          disabled={isReadOnly}
          {...register('department', {
            required: 'Department is required',
          })}
        />

        {/* Bio textarea */}
        <Textarea
          id="bio"
          label="Bio"
          placeholder="Tell us about yourself..."
          rows={4}
          error={errors.bio?.message}
          disabled={isReadOnly}
          {...register('bio', {
            maxLength: {
              value: 500,
              message: 'Bio must be less than 500 characters',
            },
          })}
        />

        {/* Checkboxes */}
        <div className="space-y-3">
          <Checkbox
            id="notifications"
            label="Email Notifications"
            description="Receive email updates about your account"
            disabled={isReadOnly}
            {...register('notifications')}
          />

          <Checkbox
            id="terms"
            label="Terms and Conditions"
            description="I agree to the terms and conditions"
            error={errors.terms?.message}
            disabled={isReadOnly}
            {...register('terms', {
              required: 'You must agree to the terms and conditions',
            })}
          />
        </div>

        {/* Form actions */}
        {!isReadOnly && (
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              disabled={!isFormValid}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        )}
      </form>

      {/* Debug info in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Debug Info
          </h3>
          <pre className="text-xs text-gray-600">
            {JSON.stringify(
              {
                user: user?.email,
                isFormValid,
                selectedRole,
                departmentOptions: departmentOptions.length,
              },
              null,
              2
            )}
          </pre>
        </div>
      )}
    </div>
  );
};

// Export with memo for performance optimization
export default React.memo(ExampleForm);
