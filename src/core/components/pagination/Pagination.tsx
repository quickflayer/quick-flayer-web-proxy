import MuiPagination from '@mui/material/Pagination';
import React, { FC, memo, useCallback, useMemo } from 'react';

import { getTotalPage } from '@/utils/pagination';

import { AppPaginationProps } from '.';

const Pagination: FC<AppPaginationProps> = ({
  totalCount = 0,
  onPageChange,
  onChange,
  ...props
}) => {
  const count = useMemo<number>(() => getTotalPage(totalCount), [totalCount]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      if (onPageChange) onPageChange(page);
      if (onChange) onChange(event, page);
    },
    [onChange, onPageChange],
  );

  const isHidden = useMemo(() => count <= 1, [count]);

  return (
    <MuiPagination
      color="primary"
      variant="outlined"
      count={count}
      siblingCount={1}
      onChange={handleChange}
      hidden={isHidden}
      {...props}
    />
  );
};

export default memo(Pagination);
