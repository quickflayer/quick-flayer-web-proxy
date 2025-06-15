import React, { FC, memo, ReactElement, useCallback } from 'react';

import { Box, Chip, Theme } from '@mui/material';

import Image from 'next/image';

import { Nullable } from '@/types';

type Props = {
  icon?: Nullable<string> | ReactElement;
  text?: Nullable<string>;
  color?: Nullable<string>;
};

const getBoxStyle = () => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '100%',
});

const getChipStyle = (t: Theme, color: string) => ({
  color: color,
  backgroundColor: t.palette.common.white,
  border: `1px solid ${color}`,
});

const IconTextChip: FC<Props> = ({ text, icon, color }) => {
  const renderIcon = useCallback(() => {
    if (!icon) return <>-</>;

    if (typeof icon !== 'string') return icon;

    return <Image src={icon} alt="" width={20} height={20} />;
  }, [icon]);

  if (text && !icon) return <>{text}</>;

  if (!text || !color) return <>-</>;

  return (
    <Box sx={getBoxStyle}>
      <Chip
        icon={renderIcon()}
        label={text}
        sx={(t) => getChipStyle(t, color)}
      />
    </Box>
  );
};

export default memo(IconTextChip);
