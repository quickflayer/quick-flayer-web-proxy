import React, { useCallback } from 'react';

import { useForm } from 'react-hook-form';

import { Box, Card, CardContent, Typography, Link, Grid } from '@mui/material';

import { useRegisterMutation } from '@redux/auth/auth.api';
import { storeToken } from '@utils/auth/token-manager';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@redux/auth/auth.slice';
import { useToast } from '@hooks/use-toast';

import AppButton from '@core/components/app-button/Button';
import AppTextField from '@core/components/app-inputs/TextField';
import PasswordStrength from '@/components/password-strength';

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
  const { showError, showSuccess } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const password = watch('password');

  const onSubmit = useCallback(
    async (data: RegisterFormValues) => {
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

        showSuccess('Account created successfully! Welcome to Quick Flayer.');

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

        showError(errorMessage);
      }
    },
    [registerMutation, dispatch, onSuccess, showError, showSuccess]
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
          maxWidth: 500,
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
              Create Account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Join Quick Flayer today
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <AppTextField
                  label="First Name (Optional)"
                  type="text"
                  placeholder="John"
                  fullWidth
                  size="medium"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  {...register('firstName', {
                    minLength: {
                      value: 2,
                      message: 'First name must be at least 2 characters',
                    },
                  })}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <AppTextField
                  label="Last Name (Optional)"
                  type="text"
                  placeholder="Doe"
                  fullWidth
                  size="medium"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  {...register('lastName', {
                    minLength: {
                      value: 2,
                      message: 'Last name must be at least 2 characters',
                    },
                  })}
                />
              </Grid>
            </Grid>

            <AppTextField
              label="Email"
              type="email"
              placeholder="name@example.com"
              fullWidth
              size="medium"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please provide a valid email address',
                },
              })}
            />

            <Box>
              <AppTextField
                label="Password"
                type="password"
                placeholder="••••••••"
                fullWidth
                size="medium"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long',
                  },
                  pattern: {
                    value:
                      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                    message:
                      'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character',
                  },
                })}
              />
              <PasswordStrength password={password} />
            </Box>

            <AppTextField
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              fullWidth
              size="medium"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === password || 'Passwords do not match',
              })}
            />

            <AppButton
              type="submit"
              variant="contained"
              loading={isLoading}
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
              Create Account
            </AppButton>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link
                component="button"
                type="button"
                onClick={onSwitchToLogin}
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default React.memo(RegisterForm);
