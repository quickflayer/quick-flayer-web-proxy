import { memo } from 'react';

import { Tooltip } from '@mui/material';

import Icon from '@lib/icons';

import { ModdedIconButton } from './styled-component';
import { IconButtonProps } from './type';

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  iconProps,
  toolTip,
  color = 'primary',
  ...rest
}) => {
  if (toolTip) {
    return (
      <ModdedIconButton color={color} {...rest}>
        <Tooltip title={toolTip}>
          <Icon icon={icon} {...iconProps} />
        </Tooltip>
      </ModdedIconButton>
    );
  }

  return (
    <ModdedIconButton color={color} {...rest}>
      <Icon icon={icon} {...iconProps} />
    </ModdedIconButton>
  );
};

export default memo(IconButton);
