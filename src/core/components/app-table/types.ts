import { BoxProps } from '@mui/material';
import { DataGridProps as MuiDataGridProps } from '@mui/x-data-grid';

export type DataGridProps = MuiDataGridProps & {
  wrapperProps?: BoxProps;
  onSortChange?: (sortBy: string, order: string) => void;
};
