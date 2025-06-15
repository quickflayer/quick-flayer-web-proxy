import { ElementType, JSX } from 'react';

import { BoxProps } from '@mui/material/Box';
import { PaperProps } from '@mui/material/Paper';

import { AppButtonGroupProps, AppGroupButtonItem } from '../app-button';

export type AppDrawerProps = {
  open: boolean;
  children: JSX.Element;
  title?: string;
  component?: ElementType;
  showFooter?: boolean;
  loading?: boolean;
  outlineButtonProps?: AppGroupButtonItem;
  filledButtonProps?: AppGroupButtonItem;
  footerContainerProps?: BoxProps;
  paperProps?: PaperProps;
  contentProps?: BoxProps;
  onClose: () => void;
  onSave?: (e: React.FormEvent<HTMLDivElement>) => void;
  buttonGroupProps?: AppButtonGroupProps;
};
