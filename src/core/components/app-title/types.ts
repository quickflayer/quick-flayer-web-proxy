import { BoxProps, TypographyProps as MuiTypographyProps } from '@mui/material';

import { IconProps } from '@/lib/icons';

import { AppButtonGroupProps } from '../app-button';
import { AppSearchProps } from '../app-search';
import { AppPaginationProps } from '../pagination';

type TypographyProps = Omit<MuiTypographyProps, 'variant'>;

export type TitleProps = {
  title: string;
  variant?: 'small' | 'medium' | 'large';
  weight?: 'light' | 'medium' | 'bold';
  icon?: string;
  iconProps?: IconProps;
  containerProps?: BoxProps;
} & TypographyProps;

export type ActionTitleProps = TitleProps & {
  buttonGroupProps?: AppButtonGroupProps;
  containerProps?: BoxProps;
  renderButtonStart?: () => React.ReactNode;
};

export type PaginationSearchTitleProps = ActionTitleProps & {
  paginationProps?: AppPaginationProps;
  searchProps?: AppSearchProps;
};
