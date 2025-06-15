import React from 'react';

import { Controller } from 'react-hook-form';

import gMemo from '@/utils/memo';
import { AppFileUploader } from '@core/components/app-inputs';

import { FileUploadControllerProps } from './types';

const FileUploadController = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(
  props: FileUploadControllerProps<T>,
) => {
  const { control, name } = props;

  return (
    <Controller<T>
      control={control}
      name={name}
      render={({ field }) => <AppFileUploader {...field} {...props} />}
    />
  );
};

export default gMemo(FileUploadController);
