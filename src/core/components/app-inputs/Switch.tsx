import { FormControlLabel } from '@mui/material';
import React, { memo } from 'react';

import { CustomSwitch } from './styled-component';
import { AppSwitchProps } from './types';

const AppSwitch: React.FC<AppSwitchProps> = ({
  switchProps,
  value,
  sx,
  ...rest
}) => {
  return (
    <FormControlLabel
      control={<CustomSwitch checked={value as boolean} {...switchProps} />}
      value={value}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row-reverse',
        width: '100%',
        margin: 0,
        ...sx,
      }}
      {...rest}
    />
  );
};

export default memo(AppSwitch);
