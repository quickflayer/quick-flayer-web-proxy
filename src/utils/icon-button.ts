import { Theme } from '@mui/material';

import { Any } from '@/types';

export const getColorPaletteColor = (color: Any, theme: Theme) => {
  let palette = theme.palette.primary;

  if (color in theme.palette) {
    palette = (theme.palette as Any)[color];
  }

  return palette;
};
