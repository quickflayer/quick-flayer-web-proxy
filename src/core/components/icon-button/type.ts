import { IconButtonProps as MuiIconButtonProps } from '@mui/material';

import { IconProps } from '@/lib/icons';

export type Variant = 'outlined' | 'default' | 'contained';

export type Shape = 'default' | 'square';

export type TModdedIconButton = MuiIconButtonProps & {
  shape?: Shape;
  variant?: Variant;
};

export type IconButtonProps = TModdedIconButton & {
  icon: string;
  iconProps?: Omit<IconProps, 'icon'>;
  toolTip?: string;
};
