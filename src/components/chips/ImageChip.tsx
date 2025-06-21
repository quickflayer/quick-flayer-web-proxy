import React, { FC, memo, useState } from 'react';

import { Box, Paper, Tooltip } from '@mui/material';

import Image from 'next/image';

import { Nullable } from '@/types';
import { isValidUrl } from '@/utils/common';

type Props = {
  imageUrl?: Nullable<string>;
  width?: number;
  height?: number;
};

type TooltipTitleProps = {
  title: string;
  height: number;
  width: number;
};

const getBoxStyle = () => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '100%',
});

const TooltipTitle = ({ title, height, width }: TooltipTitleProps) => (
  <Box
    sx={{
      width: 'auto',
      height: 'auto',
      bgcolor: 'common.white',
      borderRadius: 1,
    }}
  >
    <Image src={title} alt="" width={width} height={height} />
  </Box>
);

const ImageChip: FC<Props> = ({ imageUrl, width = 30, height = 30 }) => {
  const [showImage, setShowImage] = useState(true);

  if (!showImage || !imageUrl || !isValidUrl(imageUrl)) return <>-</>;
  return (
    <Box sx={getBoxStyle}>
      <Tooltip
        title={
          <TooltipTitle
            title={imageUrl}
            height={height * 4}
            width={width * 4}
          />
        }
      >
        <Paper sx={{ width: width, height: height }}>
          <Image
            src={imageUrl}
            alt=""
            width={width}
            height={height}
            onError={() => setShowImage(false)}
          />
        </Paper>
      </Tooltip>
    </Box>
  );
};

export default memo(ImageChip);
