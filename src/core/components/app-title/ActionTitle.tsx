import { Box, Grid2 } from '@mui/material';
import React, { FC, memo } from 'react';

import { Title } from '.';
import { ActionTitleContainer } from './styled-components';
import { ActionTitleProps } from './types';
import { AppButtonGroup } from '../app-button';

const ActionTitle: FC<ActionTitleProps> = ({
  buttonGroupProps,
  containerProps,
  renderButtonStart,
  ...props
}) => {
  return (
    <ActionTitleContainer {...containerProps}>
      <Title {...props} />
      <Grid2 container alignItems="center" spacing={3}>
        {renderButtonStart && renderButtonStart()}
        <Box>
          <AppButtonGroup {...buttonGroupProps} />
        </Box>
      </Grid2>
    </ActionTitleContainer>
  );
};

export default memo(ActionTitle);
