import { ReactNode } from 'react';

import {
  FormControlLabelProps,
  FormControlProps,
  InputLabelProps,
  RadioGroupProps,
  RadioProps,
  SwitchProps,
  TextFieldProps,
} from '@mui/material';
import { Control } from 'react-hook-form';
import { ActionMeta, Props as ReactSelectProps } from 'react-select';

import { Any, BaseOption, NumStr } from '@/types';

export type AppTextFieldProps = TextFieldProps & {
  isRequired?: boolean;
};

export type AppNumberFieldProps = Omit<
  AppTextFieldProps,
  'type' | 'onChange'
> & {
  value?: NumStr;
  onChange?: (value: NumStr) => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
};

export type CommonSelectProps = {
  label?: string;
  inputLabelProps?: InputLabelProps;
  error?: boolean;
  helperText?: string;
  formControlProps?: FormControlProps;
  isRequired?: boolean;
  color?: FormControlProps['color'];
};

export type ReactSelectOmitted<T, F extends boolean = boolean> = Omit<
  ReactSelectProps<T, F>,
  'onChange' | 'isMulti'
>;

export type SingleSelectProps<T extends BaseOption> = ReactSelectOmitted<T> &
  CommonSelectProps & {
    isMulti?: false;
    onChange?: (newValue: T, actionMeta?: ActionMeta<T>) => void;
  };

export type MultiSelectProps<T extends BaseOption> = ReactSelectOmitted<T> &
  CommonSelectProps & {
    isMulti?: true;
    onChange?: (newValue: T[], actionMeta?: ActionMeta<T>) => void;
  };

export type AppSelectFieldProps<T extends BaseOption> =
  | MultiSelectProps<T>
  | SingleSelectProps<T>;

export type FileUploaderProps = {
  control: Control<Any>;
  name: string;
  cropWidth?: number;
  cropHeight?: number;
  imageUrl?: string | null;
};

export type RadioOptions = {
  id: string;
  name: ReactNode;
};

export type AppRadioProps = RadioGroupProps & {
  value?: string;
  label?: ReactNode;
  row?: boolean;
  options?: RadioOptions[];
  formLabelProps?: Omit<FormControlLabelProps, 'value' | 'label' | 'control'>;
  radioProps?: RadioProps;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => void;
};

export type AppSwitchProps = Omit<FormControlLabelProps, 'control'> & {
  switchProps?: SwitchProps;
};
