import React, { FC, memo, useCallback, useMemo } from 'react';

import { Box } from '@mui/material';
import { GridSortModel } from '@mui/x-data-grid';

import { StyledDataGrid } from './styled-component';
import { DataGridProps } from './types';

const DataGrid: FC<DataGridProps> = ({
  wrapperProps,
  columns = [],
  sx,
  onSortChange,
  ...props
}) => {
  const updatedColumns = useMemo(
    () =>
      columns?.map((c) => {
        if (c.field === 'actions') {
          return {
            flex: 0,
            sortable: false,
            disableColumnMenu: true,
            headerAlign: 'center' as const,
            align: 'center' as const,
            ...c,
          };
        }
        return {
          flex: 1,
          minWidth: 100,
          ...c,
        };
      }),
    [columns]
  );

  const onSortModelChange = useCallback(
    (sortModel: GridSortModel) => {
      if (onSortChange) {
        if (sortModel.length) {
          const { field, sort } = sortModel[0];
          onSortChange(field, sort?.toUpperCase() ?? '');
        } else {
          onSortChange('', '');
        }
      }
    },
    [onSortChange]
  );

  return (
    <Box {...wrapperProps}>
      <StyledDataGrid
        disableColumnSelector
        disableRowSelectionOnClick
        disableMultipleRowSelection
        columns={updatedColumns}
        onSortModelChange={onSortModelChange}
        {...props}
        sx={sx}
      />
    </Box>
  );
};

export default memo(DataGrid);
