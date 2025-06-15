import React from 'react';

import { Controller } from 'react-hook-form';

import { AppNumberField } from '@core/components/app-inputs';

import { NumStr } from '@/types';
import gMemo from '@/utils/memo';

import { NumberFieldControllerProps } from '.';

const NumberFieldController = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(
  props: NumberFieldControllerProps<T>
) => {
  const { control, name, ...rest } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <AppNumberField
          error={!!error}
          helperText={error?.message}
          {...rest}
          {...field}
          value={field.value as NumStr}
          onIncrement={() => field.onChange(Number(field.value) + 1)}
          onDecrement={() => field.onChange(Number(field.value) - 1)}
        />
      )}
    />
  );
};

export default gMemo(NumberFieldController);
