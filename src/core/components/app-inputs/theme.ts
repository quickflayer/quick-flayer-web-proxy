'use client';

import { FormControlProps } from '@mui/material';
import { Theme as MuiTheme } from '@mui/material/styles';
import { GroupBase, StylesConfig, Theme } from 'react-select';

import { BaseOption } from '@/types';
import { hexToRGBA, mixWithWhite } from '@/utils/color-utils';
import { getColorPaletteColor } from '@/utils/icon-button';

type ColorOption = BaseOption & { color?: string };

export const getBaseStyles = <T extends BaseOption>(
  theme: MuiTheme,
  error?: boolean,
  color?: FormControlProps['color']
): StylesConfig<T, boolean, GroupBase<T>> => {
  const palette = getColorPaletteColor(color, theme);

  return {
    option: (base, state) => ({
      ...base,
      fontSize: 14,
      ...(state.isSelected && {
        backgroundColor: palette.main,
        ':active': { backgroundColor: palette.light },
      }),
      ':hover': {
        backgroundColor: hexToRGBA(
          theme.palette.common.black,
          +theme.palette.action.hover
        ),
      },
    }),
    placeholder: (base) => ({ ...base, color: theme.palette.text.disabled }),
    menu: (base) => ({
      ...base,
      color: theme.palette.common.black,
      backgroundColor: theme.palette.common.white,
      zIndex: 9999,
    }),
    menuList: (base) => ({ ...base }),
    multiValue: (base, { data }) => {
      const colorOption = data as ColorOption;
      return {
        ...base,
        backgroundColor: colorOption.color || palette.main,
        borderRadius: theme.shape.borderRadius,
        color: palette.contrastText,
        paddingLeft: '4px',
      };
    },
    control: (base, state) => ({
      ...base,
      width: '100%',
      boxShadow: 'none',
      ':hover': {
        border: `1px solid ${theme.palette.common.black}`,
      },
      ':focus-within': {
        border: `2px solid ${palette.main}`,
        ':hover': {
          border: `2px solid ${palette.main}`,
        },
      },
      ...(error && {
        border: `1px solid ${theme.palette.error.main}`,
        ':focus-within': {
          border: `2px solid ${theme.palette.error.main}`,
          ':hover': {
            border: `2px solid ${theme.palette.error.main}`,
          },
        },
        ':hover': {
          border: `1px solid ${theme.palette.error.main}`,
        },
      }),
      backgroundColor: mixWithWhite(theme.palette.background.paper, 5),
      ...(state.isDisabled && {
        backgroundColor: theme.palette.common.disabled,
      }),
    }),

    multiValueLabel: (base) => ({
      ...base,
      backgroundColor: palette.main,
      color: palette.contrastText,
      padding: '3px 6px',
    }),
    multiValueRemove: (base) => ({
      ...base,
      cursor: 'pointer',
      ':hover': {
        backgroundColor: theme.palette.error.main,
      },
    }),
    menuPortal: (base) => ({ ...base, zIndex: 3 }),
    valueContainer: (base, state) => ({
      ...base,
      ...(state.isMulti && {
        padding: theme.spacing(0.75, 0.25, 0.25, 0.25),
      }),
    }),
    singleValue: (base) => ({
      ...base,
      color: theme.palette.common.black,
    }),
  };
};

export function getBaseTheme(currentTheme: Theme, theme: MuiTheme): Theme {
  return {
    ...currentTheme,
    borderRadius: theme.shape.borderRadius,
    spacing: { ...currentTheme.spacing, controlHeight: 40 },
    colors: {
      ...currentTheme.colors,
      primary: theme.palette.primary.main,
      primary25: theme.palette.action.hover,
      danger: theme.palette.error.main,
    },
  };
}
