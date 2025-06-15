import React, { memo } from 'react';

import { Box } from '@mui/material';

import Icon from '@/lib/icons';

import { StyledTitle } from './styled-components';
import { TitleProps } from './types';

const fontSizeMap = {
  small: 20,
  medium: 22,
  large: 24,
};

const fontWeightMap = {
  light: 400,
  medium: 500,
  bold: 700,
};

const Title: React.FC<TitleProps> = ({
  title,
  variant = 'medium',
  weight = 'medium',
  icon,
  iconProps,
  containerProps,
  sx,
  ...props
}) => {
  return (
    <Box display="flex" alignItems="center" gap={1} {...containerProps}>
      {icon && <Icon icon={icon} {...iconProps} />}
      <StyledTitle
        sx={{
          fontSize: fontSizeMap[variant],
          fontWeight: fontWeightMap[weight],
          ...sx,
        }}
        {...props}
      >
        {title}
      </StyledTitle>
    </Box>
  );
};

export default memo(Title);
