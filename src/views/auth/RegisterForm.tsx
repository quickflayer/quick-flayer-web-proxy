import React, { useCallback } from 'react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Box, Card, CardContent, Typography, Link, Grid } from '@mui/material';

import { useAuth } from '@hooks/use-auth';
import { useToast } from '@hooks/use-toast';
import { TextFieldController } from '@/components/field-controller';
import resolver from '@/utils/resolver';

import AppButton from '@core/components/app-button/Button';
import PasswordStrength from '@/components/password-strength';
import { logger } from '@/utils/logger';

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

// Register Schema
const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, 'First name must be at least 2 characters')
      .optional()
      .or(z.literal('')),
    lastName: z
      .string()
      .min(2, 'Last name must be at least 2 characters')
      .optional()
      .or(z.literal('')),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please provide a valid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter')
      .regex(
        /((?=.*\d)|(?=.*\W+))/,
        'Password must contain at least 1 number or special character'
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm = ({ onSuccess, onSwitchToLogin }: RegisterFormProps) => {
  const { register, isLoading } = useAuth();
  const { showError, showSuccess } = useToast();

  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: resolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const onSubmit = useCallback(
    async (data: RegisterFormValues) => {
      try {
        logger.log('Registering user:', data);

        await register({
          email: data.email,
          password: data.password,
          firstName: data.firstName?.trim() || undefined,
          lastName: data.lastName?.trim() || undefined,
        });

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
    [register, onSuccess, showError, showSuccess]
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
                <TextFieldController
                  name="firstName"
                  control={control}
                  label="First Name (Optional)"
                  type="text"
                  placeholder="John"
                  fullWidth
                  size="medium"
                  autoComplete="given-name"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextFieldController
                  name="lastName"
                  control={control}
                  label="Last Name (Optional)"
                  type="text"
                  placeholder="Doe"
                  fullWidth
                  size="medium"
                  autoComplete="family-name"
                />
              </Grid>
            </Grid>

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

            <Box>
              <TextFieldController
                name="password"
                control={control}
                label="Password"
                type="password"
                placeholder="••••••••"
                fullWidth
                size="medium"
                autoComplete="new-password"
                isRequired
              />
              <PasswordStrength password={password} />
            </Box>

            <TextFieldController
              name="confirmPassword"
              control={control}
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              fullWidth
              size="medium"
              autoComplete="new-password"
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
              {isLoading || isSubmitting
                ? 'Creating Account...'
                : 'Create Account'}
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
