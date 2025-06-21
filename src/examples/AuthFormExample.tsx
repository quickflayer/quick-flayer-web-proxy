import React, { useState } from 'react';

import {
  Box,
  Button,
  Paper,
  Typography,
  Stack,
  Tabs,
  Tab,
  Divider,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  TextFieldController,
  SwitchController,
} from '@/components/field-controller';
import PasswordStrength from '@/components/password-strength';
import { logger } from '@/utils/logger';
import resolver from '@/utils/resolver';

// Login Schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean(),
});

// Register Schema
const registerSchema = z
  .object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(
        /((?=.*\d)|(?=.*\W+))/,
        'Password must contain at least one number or special character'
      ),
    confirmPassword: z.string(),
    acceptTerms: z
      .boolean()
      .refine(
        (val) => val === true,
        'You must accept the terms and conditions'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type LoginData = z.infer<typeof loginSchema>;
type RegisterData = z.infer<typeof registerSchema>;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const AuthFormExample: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  // Login Form
  const loginForm = useForm<LoginData>({
    resolver: resolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  // Register Form
  const registerForm = useForm<RegisterData>({
    resolver: resolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const onLoginSubmit = async (data: LoginData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      logger.log('Login data:', data);
      alert('Login successful!');
    } catch (error) {
      logger.error('Login error:', error);
    }
  };

  const onRegisterSubmit = async (data: RegisterData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      logger.log('Register data:', data);
      alert('Registration successful!');
    } catch (error) {
      logger.error('Registration error:', error);
    }
  };

  const passwordValue = registerForm.watch('password');

  return (
    <Paper sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
      </Box>

      {/* Login Tab */}
      <TabPanel value={tabValue} index={0}>
        <Box sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom align="center">
            Welcome Back
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mb: 3 }}
          >
            Sign in to your account
          </Typography>

          <Box
            component="form"
            onSubmit={loginForm.handleSubmit(onLoginSubmit)}
          >
            <Stack spacing={3}>
              <TextFieldController
                name="email"
                control={loginForm.control}
                label="Email Address"
                type="email"
                isRequired
                fullWidth
                autoComplete="email"
              />

              <TextFieldController
                name="password"
                control={loginForm.control}
                label="Password"
                type="password"
                isRequired
                fullWidth
                autoComplete="current-password"
              />

              <SwitchController
                name="rememberMe"
                control={loginForm.control}
                label="Remember me"
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loginForm.formState.isSubmitting}
              >
                {loginForm.formState.isSubmitting ? 'Signing In...' : 'Sign In'}
              </Button>
            </Stack>
          </Box>
        </Box>
      </TabPanel>

      {/* Register Tab */}
      <TabPanel value={tabValue} index={1}>
        <Box sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom align="center">
            Create Account
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mb: 3 }}
          >
            Join us today
          </Typography>

          <Box
            component="form"
            onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
          >
            <Stack spacing={3}>
              <Stack direction="row" spacing={2}>
                <TextFieldController
                  name="firstName"
                  control={registerForm.control}
                  label="First Name"
                  isRequired
                  fullWidth
                  autoComplete="given-name"
                />

                <TextFieldController
                  name="lastName"
                  control={registerForm.control}
                  label="Last Name"
                  isRequired
                  fullWidth
                  autoComplete="family-name"
                />
              </Stack>

              <TextFieldController
                name="email"
                control={registerForm.control}
                label="Email Address"
                type="email"
                isRequired
                fullWidth
                autoComplete="email"
              />

              <TextFieldController
                name="password"
                control={registerForm.control}
                label="Password"
                type="password"
                isRequired
                fullWidth
                autoComplete="new-password"
              />

              {/* Password Strength Indicator */}
              {passwordValue && <PasswordStrength password={passwordValue} />}

              <TextFieldController
                name="confirmPassword"
                control={registerForm.control}
                label="Confirm Password"
                type="password"
                isRequired
                fullWidth
                autoComplete="new-password"
              />

              <Divider />

              <SwitchController
                name="acceptTerms"
                control={registerForm.control}
                label="I accept the terms and conditions"
                isRequired
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={registerForm.formState.isSubmitting}
              >
                {registerForm.formState.isSubmitting
                  ? 'Creating Account...'
                  : 'Create Account'}
              </Button>
            </Stack>
          </Box>
        </Box>
      </TabPanel>
    </Paper>
  );
};

export default React.memo(AuthFormExample);
