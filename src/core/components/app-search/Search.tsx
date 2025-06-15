'use client';

import React, { memo, useCallback } from 'react';

import useDebounce from '@core/hooks/use-debounce';

import { AppSearchIcon, AppSearchProps } from '.';
import { AppTextField } from '../app-inputs';

const Search: React.FC<AppSearchProps> = ({ query = '', onChange }) => {
  const debouncedChange = useDebounce((newValue: string) => {
    if (onChange) {
      onChange(newValue);
    }
  }, 30);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;
      debouncedChange(newQuery);
    },
    [debouncedChange],
  );

  const handleClear = useCallback(() => {
    if (onChange) {
      onChange('');
    }
  }, [onChange]);

  return (
    <AppTextField
      fullWidth
      size="small"
      placeholder="Search"
      value={query}
      onChange={handleChange}
      slotProps={{
        input: {
          endAdornment: (
            <AppSearchIcon onClear={handleClear} hasValue={query !== ''} />
          ),
        },
      }}
      sx={{
        '& input::placeholder': {
          fontSize: '15px',
        },
      }}
    />
  );
};

export default memo(Search);
