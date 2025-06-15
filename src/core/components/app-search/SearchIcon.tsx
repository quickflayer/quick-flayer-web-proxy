import React from 'react';

import { InputAdornment } from '@mui/material';

import IconButton from '@core/components/icon-button';

import Icon from '@/lib/icons';
import { ICONS } from '@/lib/icons/icons-const';

import { IconWrapper } from './styled-components';

import { AppSearchIconProps } from '.';

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
