import { ReactNode } from 'react';

import { ButtonProps } from '@mui/material';

import { IconButtonProps } from '../icon-button/type';

export type AppButtonProps = ButtonProps & {
  loading?: boolean;
  minWidth?: number;
};

export type AppGroupButtonItem = AppButtonProps & {
  isHidden?: boolean;
  label?: ReactNode;
  iconButtonProps?: IconButtonProps;
};

export type AppButtonGroupProps = {
  containedButtonProps?: AppGroupButtonItem;
  outlinedButtonProps?: AppGroupButtonItem;
  [key: string]: AppGroupButtonItem | undefined;
};
