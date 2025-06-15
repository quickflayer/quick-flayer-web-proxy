import { Grid2 } from '@mui/material';
import React, { FC, memo } from 'react';

import { ActionTitle, PaginationSearchTitleProps } from '.';
import { AppSearch } from '../app-search';
import { AppPagination } from '../pagination';

const PaginationSearchTitle: FC<PaginationSearchTitleProps> = ({
  paginationProps,
  searchProps,
  ...rest
}) => {
  return (
    <ActionTitle
      {...rest}
      renderButtonStart={() => (
        <Grid2 container alignItems="center">
          <Grid2>
            <AppSearch {...searchProps} />
          </Grid2>
          <Grid2>
            <AppPagination {...paginationProps} />
          </Grid2>
        </Grid2>
      )}
    />
  );
};

export default memo(PaginationSearchTitle);
