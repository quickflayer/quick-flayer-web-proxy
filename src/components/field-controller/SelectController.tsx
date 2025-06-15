import React from 'react';

import { Controller } from 'react-hook-form';

import { AppSelectField } from '@core/components/app-inputs';

import { BaseOption } from '@/types';
import gMemo from '@/utils/memo';

import { SelectControllerProps } from '.';

const SelectController = <
  T extends Record<string, unknown> = Record<string, unknown>,
  S extends BaseOption = BaseOption,
>(
  props: SelectControllerProps<T, S>
) => {
  const { control, name, ...rest } = props;
  return (
    <Controller<T>
      control={control}
      name={name}
      render={({ field: { value, ...field }, fieldState: { error } }) => (
        <AppSelectField<S>
          value={value as S}
          {...field}
          {...rest}
          error={!!error}
          helperText={error?.message}
          isMulti={false}
        />
      )}
    />
  );
};

export default gMemo(SelectController);
