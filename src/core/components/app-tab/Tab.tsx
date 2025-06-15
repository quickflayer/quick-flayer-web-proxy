'use client';

import * as React from 'react';
import { useCallback } from 'react';

import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Icon from '@/lib/icons';

import { HorizontalWrapper } from './styled-components';
import { AppTabProps } from './types';

export default function AppTab({
  tabs,
  disabled = false,
  orientation = 'horizontal',
  panelContainerProps = {},
  wrapperProps = {},
  variant = 'standard',
  children,
}: AppTabProps) {
  const pathname = usePathname();

  const { className = '', ...rest } = wrapperProps;

  const renderTitle = useCallback((title: string, icon?: string) => {
    return (
      <Grid container alignItems="center" gap={1} color="primary.main">
        {icon && <Icon icon={icon} />}
        {title}
      </Grid>
    );
  }, []);

  return (
    <HorizontalWrapper
      className={`${orientation + className} ${variant}`}
      {...rest}
    >
      <Tabs
        variant="scrollable"
        indicatorColor="secondary"
        textColor="inherit"
        aria-label="full width tabs"
        orientation={orientation}
        className={`${orientation}-tabs`}
        value={tabs?.findIndex((tab) => tab?.path === pathname) || 0}
      >
        {tabs?.map((tab, index) => (
          <Tab
            key={index}
            label={renderTitle(tab?.label, tab?.icon)}
            disabled={disabled || tab?.disabled}
            href={tab?.path}
            component={Link}
          />
        ))}
      </Tabs>
      <Box {...panelContainerProps} className={`${orientation}-panels`}>
        {children}
      </Box>
    </HorizontalWrapper>
  );
}
