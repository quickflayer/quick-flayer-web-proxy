// React imports (first)
import React, { useState } from 'react';

// External dependencies (alphabetical)
import { useForm } from 'react-hook-form';

// @/** imports
import { useAuth } from '@/hooks/useAuth';

// Relative imports
import { Button } from '../../core/ui/button';
import { Input } from '../../core/ui/input';

interface LoginFormProps {
  onSuccess?: () => void;
}

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login, isLoading, error } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    setLoginError(null);
    const success = await login(data.email, data.password);
    if (success && onSuccess) {
      onSuccess();
    } else if (!success) {
      setLoginError('Invalid email or password');
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>
      
      {(loginError || error) && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {loginError || error}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              message: 'Invalid email address',
            },
          })}
        />
        
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
              message: 'Password must be at least 8 characters',
            },
          })}
        />
        
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          className="w-full"
        >
          Log In
        </Button>
      </form>
    </div>
  );
};

export default React.memo(LoginForm);
