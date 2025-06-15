import React from 'react';

import { Controller } from 'react-hook-form';

import { AppRadio } from '@core/components/app-inputs';

import { RadioControllerProps } from '.';

const RadioController = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(
  props: RadioControllerProps<T>,
) => {
  const { control, name, ...rest } = props;

  return (
    <Controller<T>
      control={control}
      name={name}
      render={({
        field: { value, ...field },
        formState: { defaultValues },
      }) => (
        <AppRadio
          {...rest}
          {...field}
          defaultValue={defaultValues?.[name]}
          value={value as unknown as string}
        />
      )}
    />
  );
};

export default RadioController;
