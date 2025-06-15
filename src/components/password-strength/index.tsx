import React, { useMemo } from 'react';

import {
  Box,
  Typography,
  LinearProgress,
  Chip,
  Stack,
  LinearProgressProps,
} from '@mui/material';

import Icon from '@lib/icons';
import { ICONS } from '@lib/icons/icons-const';
import requirements from '@utils/auth/password-strength';

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  const passedRequirements = useMemo(() => {
    return requirements.filter((req) => req.test(password));
  }, [requirements, password]);

  const strength = useMemo(() => {
    const score = passedRequirements.length;
    if (score === 0)
      return { label: '', color: 'default' as const, progress: 0 };
    if (score <= 1)
      return { label: 'Weak', color: 'error' as const, progress: 25 };
    if (score <= 2)
      return { label: 'Fair', color: 'warning' as const, progress: 50 };
    if (score <= 3)
      return { label: 'Good', color: 'info' as const, progress: 75 };
    return { label: 'Strong', color: 'success' as const, progress: 100 };
  }, [passedRequirements.length]);

  if (!password) return null;

  return (
    <Box sx={{ mt: 2 }}>
      {/* Strength indicator */}
      <Box sx={{ mb: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Password strength:
          </Typography>
          {strength.label && (
            <Chip
              label={strength.label}
              size="small"
              color={strength.color}
              variant="outlined"
              sx={{ fontSize: '0.75rem', height: 20 }}
            />
          )}
        </Box>
        <LinearProgress
          variant="determinate"
          value={strength.progress}
          color={strength.color as LinearProgressProps['color']}
          sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: 'grey.200',
            '& .MuiLinearProgress-bar': {
              borderRadius: 3,
            },
          }}
        />
      </Box>

      {/* Requirements checklist */}
      <Stack spacing={1}>
        {requirements.map((requirement, index) => {
          const isPassed = requirement.test(password);
          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              {isPassed ? (
                <Icon
                  icon={ICONS.SUCCESS_ANIMATED}
                  sx={{
                    fontSize: 16,
                    color: 'success.main',
                  }}
                />
              ) : (
                <Icon
                  icon={ICONS.CIRCLE_OUTLINE}
                  sx={{
                    fontSize: 16,
                    color: 'grey.400',
                  }}
                />
              )}
              <Typography
                variant="caption"
                sx={{
                  color: isPassed ? 'success.main' : 'text.secondary',
                  fontSize: '0.75rem',
                }}
              >
                {requirement.label}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default React.memo(PasswordStrength);
