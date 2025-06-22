import React, { FC, memo } from 'react';

import { Box, Typography } from '@mui/material';

import ButtonGroup from '@core/components/app-button/ButtonGroup';

import Icon from '@/lib/icons';
import { ICONS } from '@/lib/icons/icons-const';
import { DeleteItem } from '@/types';

import { StyledModal } from './styled-component';

type Props = {
  onClose: () => void;
  itemToDelete: DeleteItem;
  onDelete: (id: number | string) => void;
  loading?: boolean;
};

const { EXCLAMATION_ANIMATED } = ICONS;

const DeleteModal: FC<Props> = ({
  onClose,
  itemToDelete,
  onDelete,
  loading,
}) => {
  return (
    <StyledModal
      open={Boolean(itemToDelete)}
      onClose={onClose}
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
    >
      <Box className="delete-modal">
        <Box className="header">
          <Icon icon={EXCLAMATION_ANIMATED} className="warning-icon" />
          <Typography
            id="delete-modal-title"
            className="title"
            variant="h5"
            component="h2"
          >
            Confirm Deletion
          </Typography>
        </Box>
        <Typography
          id="delete-modal-description"
          className="description"
          sx={{ mt: 2 }}
        >
          Are you sure you want to delete this item{' ' + itemToDelete?.name}?
          This action cannot be undone.
        </Typography>
        <Box className="button-group">
          <ButtonGroup
            containedButtonProps={{
              isHidden: false,
              label: 'Delete',
              fullWidth: true,
              loading,
              onClick: () => itemToDelete?.id && onDelete(itemToDelete?.id),
            }}
            outlinedButtonProps={{
              isHidden: false,
              onClick: onClose,
              fullWidth: true,
              loading,
            }}
          />
        </Box>
      </Box>
    </StyledModal>
  );
};

export default memo(DeleteModal);
