'use client';

import { Box, styled, TextField, Switch, InputLabel } from '@mui/material';

import { mixWithWhite } from '@/utils/color-utils';
import { getColorPaletteColor } from '@/utils/icon-button';

export const CustomTextField = styled(TextField)(
  ({ theme, error, disabled }) => ({
    ...(disabled
      ? {
          ['& .MuiInputLabel-root']: {
            color: theme.palette.text.disabled,
          },

          ['& .MuiOutlinedInput-root']: {
            paddingRight: 0,

            ['& .MuiInputBase-input']: {
              color: theme.palette.text.disabled,
            },

            ['& .MuiOutlinedInput-notchedOutline']: {
              borderColor: theme.palette.text.disabled,
            },
          },
        }
      : {}),
    ...(theme.palette.mode === 'dark' && !error && !disabled
      ? {
          ['&:not(:focus-within) .MuiInputLabel-root']: {
            color: theme.palette.common.black,
          },

          ['& .MuiOutlinedInput-root']: {
            ['& .MuiInputBase-input']: {
              color: theme.palette.common.black,
            },

            ['&:not(:focus-within) .MuiOutlinedInput-notchedOutline']: {
              borderColor: theme.palette.common.black,
            },
          },
        }
      : {}),

    ['& .MuiInputBase-input']: {
      ['&:-webkit-autofill']: {
        WebkitBoxShadow: '0 0 0 100px transparent inset',
        WebkitTextFillColor: theme.palette.common.black,
        transition: 'background-color 5000s ease-in-out 0s',
      },
    },
  })
);

export const NumberInput = styled(CustomTextField)({
  '& input[type=number]': {
    mozAppearance: 'textfield',
    WebkitAppearance: 'none',
    margin: 0,
  },
  '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button':
    {
      WebkitAppearance: 'none',
      margin: 0,
    },
});

export const DropZoneInputContainer = styled(Box)({
  border: '2px dashed #ccc',
  padding: '20px',
  cursor: 'pointer',
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const CropperContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  '& .cropper': {
    position: 'relative',
    flex: 1,
    width: '100%',
    height: '100%',
  },

  '& .controls': {
    padding: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
});

export const ImagePreviewContainer = styled(Box)({
  marginTop: '20px',
  position: 'relative',
  display: 'inline-block',
  width: '100%',
  maxWidth: '100%',
  overflow: 'hidden',

  ['& .cropped-image']: {
    objectFit: 'cover',
    filter: 'blur(0)',
    transition: 'filter 0.3s',
    width: '100%',
    height: '100%',

    ['&:hover']: {
      filter: 'blur(2px)',
    },
  },

  ['& .clear-button']: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'none',
    pointerEvents: 'none',
  },

  ['&:hover .clear-button']: {
    display: 'block',
    pointerEvents: 'auto',
  },
});

export const CustomSwitch = styled(Switch)(({ theme, color }) => {
  const palette = getColorPaletteColor(color, theme);

  return {
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: palette.main,
        '& + .MuiSwitch-track': {
          backgroundColor: palette.light,
          opacity: 1,
          border: 0,
          ...theme.applyStyles('dark', {
            backgroundColor: palette.light,
          }),
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.grey[100],
        ...theme.applyStyles('dark', {
          color: theme.palette.grey[600],
        }),
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.7,
        ...theme.applyStyles('dark', {
          opacity: 0.3,
        }),
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: '#E9E9EA',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
      ...theme.applyStyles('dark', {
        backgroundColor: '#39393D',
      }),
    },
  };
});

export const SelectLabel = styled(InputLabel)(({ theme, color }) => ({
  color: theme.palette.common.black,

  ['& .MuiFormLabel-asterisk']: {
    color: theme.palette.common.black,
  },

  ['&.Mui-disabled']: {
    ['&.MuiInputLabel-shrink']: {
      backgroundColor: theme.palette.common.disabled,
    },

    ['& .MuiFormLabel-asterisk']: {
      color: theme.palette.text.disabled,
    },
  },

  ['&.MuiInputLabel-shrink']: {
    padding: theme.spacing(0, 0.5),
    backgroundColor: mixWithWhite(theme.palette.background.paper, 5),
  },

  ['&.Mui-focused']: {
    ['&.MuiInputLabel-shrink']: {
      padding: theme.spacing(0, 0.5),
      backgroundColor: mixWithWhite(theme.palette.background.paper, 5),
      color: getColorPaletteColor(color, theme).main,

      ['& .MuiFormLabel-asterisk']: {
        color: getColorPaletteColor(color, theme).main,
      },
    },
  },

  ['&.Mui-error']: {
    ['& .MuiFormLabel-asterisk']: {
      color: theme.palette.error.main,
    },

    ['&.MuiInputLabel-shrink']: {
      color: theme.palette.error.main,

      ['& .MuiFormLabel-asterisk']: {
        color: theme.palette.error.main,
      },
    },
  },
}));
