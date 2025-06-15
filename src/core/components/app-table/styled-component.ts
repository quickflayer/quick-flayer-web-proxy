import { styled } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { hexToRGBA } from '@/utils/color-utils';

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  color: theme.palette.common.black,
  border: `1px solid ${theme.palette.primary.main}`,

  ['& .MuiDataGrid-columnHeader, .MuiDataGrid-filler']: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: 16,
  },

  ['& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus']: {
    outline: 'none',
  },

  ['& .MuiDataGrid-columnHeaderTitle']: {
    fontWeight: 'bold',
  },

  ['& .MuiDataGrid-columnHeader:hover']: {
    backgroundColor: hexToRGBA(theme.palette.primary.main, 0.9),
  },

  ['& .MuiDataGrid-columnSeparator']: {
    color: theme.palette.primary.contrastText,
  },

  ['& .MuiDataGrid-footerContainer']: {
    display: 'none',
  },
}));
