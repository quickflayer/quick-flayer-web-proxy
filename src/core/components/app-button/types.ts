import { ButtonProps } from '@mui/material';
import { ReactNode } from 'react';

import { KeyActionEnum } from '@/enum/key-actions';

import { IconButtonProps } from '../icon-button/type';

export type AppButtonProps = ButtonProps & {
  loading?: boolean;
  keyFor?: KeyActionEnum;
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
