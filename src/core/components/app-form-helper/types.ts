import { JSX } from 'react';

import { GridProps } from '@mui/material';

export type FormField = {
  component: JSX.Element;
  size?: GridProps['size'];
};

export type AppFormRowProps = {
  fields: FormField[];
  spacing?: number;
  alignItems?: GridProps['alignItems'];
  justifyContent?: GridProps['justifyContent'];
};
