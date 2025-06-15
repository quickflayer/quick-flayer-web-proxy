import { InputAdornment } from '@mui/material';
import React from 'react';

import { ICONS } from '@/lib/icons/icons-const';

import { AppSearchIconProps } from '.';
import { IconWrapper } from './styled-components';
import Icon from '../../../lib/icons';
import IconButton from '../icon-button';

const { CLOSE, SEARCH } = ICONS;

const SearchIcon: React.FC<AppSearchIconProps> = ({ hasValue, onClear }) => {
  return (
    <InputAdornment position="end">
      <IconWrapper
        hasvalue={String(hasValue)}
        onClick={hasValue ? onClear : undefined}
      >
        <IconButton
          icon={CLOSE}
          onClick={hasValue ? onClear : undefined}
          className="close-icon"
          size="small"
          iconProps={{ fontSize: 'small' }}
        />

        <Icon icon={SEARCH} className="search-icon" />
      </IconWrapper>
    </InputAdornment>
  );
};

export default React.memo(SearchIcon);
