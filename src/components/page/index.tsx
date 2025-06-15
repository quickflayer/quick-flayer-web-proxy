import React from 'react';

import { Stack, StackProps } from '@mui/material';

type Props = StackProps & {
  children: React.ReactNode;
};

const Page: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Stack gap={2} width="100%" height="calc(100vh - 80px)" {...props}>
      {children}
    </Stack>
  );
};

export default Page;
