import { Controller } from 'react-hook-form';

import { BaseOption } from '@/types';
import gMemo from '@/utils/memo';
import { AppSelectField } from '@core/components/app-inputs';

import { MultiSelectControllerProps } from '.';

const MultiSelectController = <
  T extends Record<string, unknown> = Record<string, unknown>,
  S extends BaseOption = BaseOption,
>(
  props: MultiSelectControllerProps<T, S>,
) => {
  const { control, name, ...rest } = props;
  return (
    <Controller<T>
      control={control}
      name={name}
      render={({ field: { value, ...field }, fieldState: { error } }) => (
        <AppSelectField<S>
          value={value as S[]}
          {...field}
          {...rest}
          error={!!error}
          helperText={error?.message}
          isMulti={true}
        />
      )}
    />
  );
};

export default gMemo(MultiSelectController);
