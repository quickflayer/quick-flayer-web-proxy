import React, { FC, memo } from 'react';

import { Box, Grid } from '@mui/material';

import { AppButtonGroup } from '../app-button';

import { ActionTitleContainer } from './styled-components';
import { ActionTitleProps } from './types';

import { Title } from '.';

const ActionTitle: FC<ActionTitleProps> = ({
  buttonGroupProps,
  containerProps,
  renderButtonStart,
  ...props
}) => {
  return (
    <ActionTitleContainer {...containerProps}>
      <Title {...props} />
      <Grid container alignItems="center" spacing={3}>
        {renderButtonStart && renderButtonStart()}
        <Box>
          <AppButtonGroup {...buttonGroupProps} />
        </Box>
      </Grid>
    </ActionTitleContainer>
  );
};

export default memo(ActionTitle);
