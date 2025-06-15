'use client';

import React, { useCallback, useMemo, useState } from 'react';

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { useTheme } from '@mui/material/styles';
import { SingleValue, MultiValue, ActionMeta, Props } from 'react-select';

import dynamic from 'next/dynamic';
const ReactSelect = dynamic(() => import('react-select'), {
  ssr: false,
  loading: () => <AppTextField />,
});

import { Any, BaseOption } from '@/types';
import gMemo from '@/utils/memo';

import { SelectLabel } from './styled-component';
import { getBaseStyles, getBaseTheme } from './theme';
import { AppSelectFieldProps } from './types';

import { AppTextField } from '.';

function BaseSelect<T extends BaseOption>(props: Props<T, boolean>) {
  return <ReactSelect {...(props as Any)} />;
}

const AppSelect = <T extends BaseOption>(props: AppSelectFieldProps<T>) => {
  const {
    label,
    placeholder = 'Choose',
    options = [],
    value,
    isMulti = false,
    components: passedComponents = {},
    formControlProps = {},
    getOptionValue = (op) => String(op?.id),
    getOptionLabel = (op) => String(op?.name),
    isRequired,
    helperText,
    error = false,
    inputLabelProps,
    onChange,
    color = 'primary',
    isDisabled = false,
    onBlur,
    onFocus,
    ...rest
  } = props;

  const theme = useTheme();

  const [isFocused, setIsFocused] = useState(false);

  const shouldShrink = useMemo(
    () =>
      isFocused ||
      (isMulti ? Array.isArray(value) && value?.length > 0 : Boolean(value)),
    [isFocused, value, isMulti]
  );

  const customComponents: Any = {
    IndicatorSeparator: null,
    ...passedComponents,
  };

  const handleChange = useCallback(
    (newValue: MultiValue<T> | SingleValue<T>, actionMeta: ActionMeta<T>) => {
      if (onChange) {
        if (isMulti) {
          (
            onChange as unknown as (
              newValue: T[],
              actionMeta?: ActionMeta<T>
            ) => void
          )(newValue as T[], actionMeta);
        } else {
          (onChange as (newValue: T, actionMeta?: ActionMeta<T>) => void)(
            newValue as T,
            actionMeta
          );
        }
      }
    },
    [onChange, isMulti]
  );

  return (
    <FormControl
      fullWidth
      size="small"
      color={color}
      disabled={isDisabled}
      sx={{ width: '100%' }}
      {...formControlProps}
    >
      <SelectLabel
        shrink={shouldShrink}
        error={error}
        required={isRequired}
        color={color}
        disabled={isDisabled}
        focused={isFocused}
        {...inputLabelProps}
      >
        {label}
      </SelectLabel>

      <BaseSelect<T>
        id="select"
        menuPlacement="auto"
        options={options}
        isMulti={isMulti}
        value={value}
        components={customComponents}
        placeholder={!shouldShrink ? '' : placeholder}
        styles={getBaseStyles<T>(theme, error, color) as Any}
        theme={(current) => getBaseTheme(current, theme)}
        getOptionValue={getOptionValue}
        getOptionLabel={getOptionLabel}
        onFocus={(...arg) => {
          setIsFocused(true);
          onFocus?.(...arg);
        }}
        onBlur={(...arg) => {
          setIsFocused(false);
          onBlur?.(...arg);
        }}
        onChange={handleChange}
        isDisabled={isDisabled}
        {...rest}
      />
      {helperText && (
        <FormHelperText sx={{ color: theme.palette.error.main }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default gMemo(AppSelect);
