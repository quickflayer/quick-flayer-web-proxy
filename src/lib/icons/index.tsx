import React, { memo } from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

import mappedIcons from './mapped-icons';

export type IconProps = SvgIconProps & {
  icon: string;
  color?: SvgIconProps['color'];
  hidden?: boolean;
};

const Icon: React.FC<IconProps> = ({ icon, color, hidden, ...props }) => {
  if (hidden) {
    return null;
  }

  return (
    <SvgIcon
      component={mappedIcons[icon as keyof typeof mappedIcons]}
      color={color}
      style={{ color: 'inherit' }}
      {...props}
    />
  );
};

export default memo(Icon);
