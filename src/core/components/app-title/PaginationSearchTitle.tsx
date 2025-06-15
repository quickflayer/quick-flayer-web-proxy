import React, { FC, memo } from 'react';

import { Grid } from '@mui/material';

import { AppSearch } from '../app-search';
import { AppPagination } from '../pagination';

import { ActionTitle, PaginationSearchTitleProps } from '.';

const PaginationSearchTitle: FC<PaginationSearchTitleProps> = ({
  paginationProps,
  searchProps,
  ...rest
}) => {
  return (
    <ActionTitle
      {...rest}
      renderButtonStart={() => (
        <Grid container alignItems="center">
          <Grid>
            <AppSearch {...searchProps} />
          </Grid>
          <Grid>
            <AppPagination {...paginationProps} />
          </Grid>
        </Grid>
      )}
    />
  );
};

export default memo(PaginationSearchTitle);
