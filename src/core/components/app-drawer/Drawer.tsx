import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import React, { memo } from 'react';

import { AppButtonGroup } from '@/core/components/app-button';
import IconButton from '@/core/components/icon-button';
import { ICONS } from '@/lib/icons/icons-const';

import { AppDrawerProps } from '.';
import { Content, DrawerFooter, DrawerHeader } from './styled-components';
import Icon from '../../../lib/icons';

const { CLOSE_ROUNDED_ANIMATED, SQUARE_SHUFFLE } = ICONS;

const Drawer: React.FC<AppDrawerProps> = ({
  open,
  onClose,
  children,
  title,
  onSave,
  showFooter = true,
  loading = false,
  footerContainerProps,
  paperProps = {},
  outlineButtonProps = {},
  filledButtonProps = {},
  contentProps = {},
  buttonGroupProps = {},
}) => {
  const outlineProps = {
    label: 'Cancel',
    onClick: onClose,
    fullWidth: true,
    isHidden: false,
    ...outlineButtonProps,
  };

  const filledProps = {
    label: 'Save',
    fullWidth: true,
    type: 'submit' as const,
    ...filledButtonProps,
  };

  const { sx: paperSx, ...paperRest } = paperProps || {};

  return (
    <MuiDrawer
      anchor="right"
      component="form"
      open={open}
      onClose={onClose}
      onSubmit={onSave}
      PaperProps={{
        sx: {
          width: 450,
          borderRadius: 0,
          bgcolor: (t) => t.palette.common.white,
          ...paperSx,
        },
        ...paperRest,
      }}
    >
      <DrawerHeader>
        <Typography className="header">{title}</Typography>
        <IconButton
          className="close"
          onClick={onClose}
          icon={CLOSE_ROUNDED_ANIMATED}
          toolTip="Close"
          color="primary"
        />
      </DrawerHeader>
      <Divider />
      <Content {...contentProps}>
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Icon
              color="primary"
              sx={{ fontSize: 100 }}
              icon={SQUARE_SHUFFLE}
            />
          </Box>
        ) : (
          <>{children}</>
        )}
      </Content>
      {showFooter && (
        <DrawerFooter {...footerContainerProps}>
          <AppButtonGroup
            containedButtonProps={filledProps}
            outlinedButtonProps={outlineProps}
            {...buttonGroupProps}
          />
        </DrawerFooter>
      )}
    </MuiDrawer>
  );
};

export default memo(Drawer);
