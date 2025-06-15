import { FC, memo } from 'react';

import { CustomTextField } from './styled-component';

import { AppTextFieldProps } from '.';

const AppTextField: FC<AppTextFieldProps> = ({
  size = 'small',
  fullWidth = true,
  rows,
  isRequired = false,
  ...rest
}) => {
  const multiline = Boolean(rows && Number(rows) > 1);

  const commonProps = {
    size,
    fullWidth,
    rows,
    multiline,
    required: isRequired,
    ...rest,
  };

  return <CustomTextField {...commonProps} autoCapitalize="off" />;
};

export default memo(AppTextField);
