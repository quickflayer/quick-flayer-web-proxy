import React from 'react';

import { Controller } from 'react-hook-form';

import { AppTextField } from '@core/components/app-inputs';

import gMemo from '@/utils/memo';

import { TextFieldControllerProps } from '.';

const TextFieldController = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(
  props: TextFieldControllerProps<T>
) => {
  const { control, name, ...rest } = props;

  return (
    <Controller<T>
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <AppTextField
          error={!!error}
          helperText={error?.message}
          {...rest}
          {...field}
        />
      )}
    />
  );
};

export default gMemo(TextFieldController);
