'use client';

import { IconButton, styled } from '@mui/material';

import { getColorPaletteColor } from '@/utils/icon-button';

import { Shape, TModdedIconButton, Variant } from './type';

export const ModdedIconButton = styled(IconButton)<TModdedIconButton>(({
  theme,
  color = 'primary',
  variant = 'default',
  shape = 'default',
}) => {
  const palette = getColorPaletteColor(color, theme);

  const variants: Record<Variant, object> = {
    default: {},
    contained: {
      color: palette.contrastText,
      backgroundColor: palette.main,
      '&:hover': {
        backgroundColor: palette.light,
      },
    },
    outlined: { border: `1px solid ${palette.main}` },
  };

  const shapes: Record<Shape, object> = {
    default: {},
    square: { borderRadius: theme.shape.borderRadius },
  };

  return { ...variants[variant], ...shapes[shape] };
});
