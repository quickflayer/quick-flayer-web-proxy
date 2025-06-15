import { CommonColors as MuiCommonColors } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface CommonColors extends MuiCommonColors {
    disabled: string;
  }
  interface CommonColorsOptions {
    disabled?: string;
  }
}
