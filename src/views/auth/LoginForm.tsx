import React, { useCallback } from 'react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Box, Card, CardContent, Typography, Link } from '@mui/material';

import { useAuth } from '@hooks/use-auth';
import { useToast } from '@hooks/use-toast';
import { TextFieldController } from '@/components/field-controller';
import resolver from '@/utils/resolver';

import AppButton from '@core/components/app-button/Button';

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

// Login Schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please provide a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = ({ onSuccess, onSwitchToRegister }: LoginFormProps) => {
  const { login, isLoading } = useAuth();
  const { showError, showSuccess } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: resolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = useCallback(
    async (data: LoginFormValues) => {
      try {
        const success = await login(data.email, data.password);
        if (success) {
          showSuccess('Welcome back! You have been successfully logged in.');
          if (onSuccess) {
            onSuccess();
          }
        } else {
          showError(
            'Invalid email or password. Please check your credentials and try again.'
          );
        }
      } catch (error: any) {
        const errorMessage =
          error?.message || 'Login failed. Please try again.';
        showError(errorMessage);
      }
    },
    [login, onSuccess, showError, showSuccess]
  );

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: { xs: 2, sm: 3 },
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 400,
          borderRadius: 3,
          boxShadow:
            '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              Quick Flayer
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}
            >
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to your account
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <TextFieldController
              name="email"
              control={control}
              label="Email"
              type="email"
              placeholder="name@example.com"
              fullWidth
              size="medium"
              autoComplete="email"
              isRequired
            />

            <TextFieldController
              name="password"
              control={control}
              label="Password"
              type="password"
              placeholder="••••••••"
              fullWidth
              size="medium"
              autoComplete="current-password"
              isRequired
            />

            <AppButton
              type="submit"
              variant="contained"
              loading={isLoading || isSubmitting}
              size="large"
              sx={{
                mt: 2,
                py: 1.5,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background:
                    'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                },
              }}
            >
              {isLoading || isSubmitting ? 'Signing In...' : 'Sign In'}
            </AppButton>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Link
                component="button"
                type="button"
                onClick={onSwitchToRegister}
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Create one
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default React.memo(LoginForm);
