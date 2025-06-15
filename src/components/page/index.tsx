import React from 'react';

import { Box, Container, Stack, StackProps } from '@mui/material';

type Props = StackProps & {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  disableGutters?: boolean;
  fullHeight?: boolean;
};

const Page: React.FC<Props> = ({
  children,
  maxWidth = 'lg',
  disableGutters = false,
  fullHeight = true,
  ...props
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: fullHeight ? 'calc(100vh - 96px)' : 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Container
        maxWidth={maxWidth}
        disableGutters={disableGutters}
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          py: { xs: 2, sm: 3 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Stack
          gap={{ xs: 2, sm: 3 }}
          width="100%"
          height="100%"
          sx={{
            flex: 1,
          }}
          {...props}
        >
          {children}
        </Stack>
      </Container>
    </Box>
  );
};

export default Page;
