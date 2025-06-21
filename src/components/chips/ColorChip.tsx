import React, { FC, memo } from 'react';

import { Box, Paper, Tooltip } from '@mui/material';

type Props = {
  color?: string;
};

const getBoxStyle = () => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '100%',
});

const ColorChip: FC<Props> = ({ color }) => {
  if (!color) return <>-</>;
  return (
    <Box sx={getBoxStyle}>
      <Tooltip title={color}>
        <Paper sx={{ width: 30, height: 30, backgroundColor: color }}></Paper>
      </Tooltip>
    </Box>
  );
};

export default memo(ColorChip);
