import React from 'react';

import { Box, Button, Paper, Typography, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  TextFieldController,
  NumberFieldController,
  SelectController,
  MultiSelectController,
  RadioController,
  SwitchController,
  FileUploadController,
} from '@/components/field-controller';
import { RadioOptions } from '@/core/components/app-inputs';
import { BaseOption } from '@/types';
import { logger } from '@/utils/logger';
import resolver from '@/utils/resolver';

const formSchema = z.object({
  // Text fields
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),

  // Number field
  age: z
    .number()
    .min(18, 'Must be at least 18 years old')
    .max(120, 'Invalid age'),

  // Select fields
  country: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .nullable(),

  skills: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .min(1, 'Select at least one skill'),

  // Radio field
  gender: z.string().min(1, 'Please select gender'),

  // Switch fields
  newsletter: z.boolean(),
  terms: z.boolean().refine((val) => val === true, 'You must accept terms'),

  // File upload
  avatar: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;

const countryOptions: BaseOption[] = [
  { id: 'us', name: 'United States' },
  { id: 'uk', name: 'United Kingdom' },
  { id: 'ca', name: 'Canada' },
  { id: 'au', name: 'Australia' },
  { id: 'de', name: 'Germany' },
];

const skillOptions: BaseOption[] = [
  { id: 'react', name: 'React' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'nodejs', name: 'Node.js' },
  { id: 'python', name: 'Python' },
  { id: 'design', name: 'UI/UX Design' },
  { id: 'devops', name: 'DevOps' },
];

const genderOptions: RadioOptions[] = [
  { id: 'male', name: 'Male' },
  { id: 'female', name: 'Female' },
  { id: 'other', name: 'Other' },
  { id: 'prefer-not-to-say', name: 'Prefer not to say' },
];

const CompleteFormExample: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: resolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      age: undefined,
      country: null,
      skills: [],
      gender: '',
      newsletter: false,
      terms: false,
      avatar: null,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      logger.log('Form submitted:', data);
      // Handle form submission here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      alert('Form submitted successfully!');
    } catch (error) {
      logger.error('Form submission error:', error);
    }
  };

  const handleReset = () => {
    reset();
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Complete Form Example
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        This form demonstrates all available field controllers with validation.
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {/* Text Fields */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>

            <Stack spacing={2}>
              <TextFieldController
                name="firstName"
                control={control}
                label="First Name"
                isRequired
                fullWidth
              />

              <TextFieldController
                name="lastName"
                control={control}
                label="Last Name"
                isRequired
                fullWidth
              />

              <TextFieldController
                name="email"
                control={control}
                label="Email Address"
                type="email"
                isRequired
                fullWidth
              />

              <TextFieldController
                name="password"
                control={control}
                label="Password"
                type="password"
                isRequired
                fullWidth
              />

              <NumberFieldController
                name="age"
                control={control}
                label="Age"
                isRequired
              />
            </Stack>
          </Box>

          {/* Selection Fields */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Preferences
            </Typography>

            <Stack spacing={2}>
              <SelectController
                name="country"
                control={control}
                label="Country"
                options={countryOptions}
                placeholder="Select your country"
                isRequired
              />

              <MultiSelectController
                name="skills"
                control={control}
                label="Skills"
                options={skillOptions}
                placeholder="Select your skills"
                isRequired
              />

              <RadioController
                name="gender"
                control={control}
                label="Gender"
                options={genderOptions}
              />
            </Stack>
          </Box>

          {/* Switches */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Settings
            </Typography>

            <Stack spacing={2}>
              <SwitchController
                name="newsletter"
                control={control}
                label="Subscribe to newsletter"
              />

              <SwitchController
                name="terms"
                control={control}
                label="I accept the terms and conditions"
                isRequired
              />
            </Stack>
          </Box>

          {/* File Upload */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Profile Picture
            </Typography>

            <FileUploadController
              name="avatar"
              control={control}
              label="Upload Avatar"
              cropWidth={200}
              cropHeight={200}
            />
          </Box>

          {/* Submit Buttons */}
          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              fullWidth
            >
              {isSubmitting ? 'Submitting...' : 'Submit Form'}
            </Button>

            <Button
              type="button"
              variant="outlined"
              onClick={handleReset}
              disabled={isSubmitting}
            >
              Reset
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
};

export default React.memo(CompleteFormExample);
