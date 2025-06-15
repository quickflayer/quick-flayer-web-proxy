import React from 'react';

import { Controller } from 'react-hook-form';

import { AppSwitch } from '@core/components/app-inputs';

import { SwitchControllerProps } from '.';

const SwitchController = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(
  props: SwitchControllerProps<T>
) => {
  const { control, name, ...rest } = props;

  return (
    <Controller<T>
      control={control}
      name={name}
      render={({ field }) => <AppSwitch {...rest} {...field} />}
    />
  );
};

export default SwitchController;
