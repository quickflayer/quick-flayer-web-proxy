import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

import { useRegisterMutation } from '@redux/auth/auth.api';
import { storeToken } from '@utils/auth/token-manager';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@redux/auth/auth.slice';

import Button from '@core/ui/button';
import Input from '@core/ui/input';
import PasswordStrength from '@core/ui/password-strength';

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

const RegisterForm = ({ onSuccess, onSwitchToLogin }: RegisterFormProps) => {
  const dispatch = useDispatch();
  const [registerMutation, { isLoading }] = useRegisterMutation();
  const [registerError, setRegisterError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const password = watch('password');

  const onSubmit = async (data: RegisterFormValues) => {
    setRegisterError(null);

    try {
      const result = await registerMutation({
        email: data.email,
        password: data.password,
        firstName: data.firstName.trim() || undefined,
        lastName: data.lastName.trim() || undefined,
      }).unwrap();

      storeToken(result.accessToken);
      dispatch(
        setCredentials({ user: result.user, accessToken: result.accessToken })
      );

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      let errorMessage = 'Registration failed. Please try again.';

      if (error.data?.message) {
        if (Array.isArray(error.data.message)) {
          errorMessage = error.data.message.join(', ');
        } else {
          errorMessage = error.data.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      setRegisterError(errorMessage);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Create Account
        </h2>
        <p className="text-gray-600">Join Quick Flayer today</p>
      </div>

      {registerError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{registerError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="firstName"
            label="First Name (Optional)"
            type="text"
            placeholder="John"
            error={errors.firstName?.message}
            {...register('firstName', {
              minLength: {
                value: 2,
                message: 'First name must be at least 2 characters',
              },
            })}
          />

          <Input
            id="lastName"
            label="Last Name (Optional)"
            type="text"
            placeholder="Doe"
            error={errors.lastName?.message}
            {...register('lastName', {
              minLength: {
                value: 2,
                message: 'Last name must be at least 2 characters',
              },
            })}
          />
        </div>

        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="name@example.com"
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please provide a valid email address',
            },
          })}
        />

        <div>
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long',
              },
              pattern: {
                value: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                message:
                  'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character',
              },
            })}
          />
          <PasswordStrength password={password} />
        </div>

        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) => value === password || 'Passwords do not match',
          })}
        />

        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          className="w-full"
        >
          Create Account
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default React.memo(RegisterForm);
