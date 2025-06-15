import React, { FC, memo, useMemo } from 'react';

import IconButton from '@core/components/icon-button';

import { ButtonGroupContainer } from './styled-components';

import { AppButtonGroupProps, AppGroupButtonItem, AppButton } from '.';

const ButtonGroup: FC<AppButtonGroupProps> = ({
  containedButtonProps,
  outlinedButtonProps,
  ...rest
}) => {
  const buttons = useMemo<{ [key: string]: AppGroupButtonItem }>(
    () => ({
      containedButtonProps: {
        isHidden: false,
        label: 'Save',
        variant: 'contained',
        ...containedButtonProps,
      },
      outlinedButtonProps: {
        isHidden: true,
        label: 'Cancel',
        variant: 'outlined',
        ...outlinedButtonProps,
      },
      ...rest,
    }),
    [containedButtonProps, outlinedButtonProps, rest]
  );

  return (
    <ButtonGroupContainer>
      {Object.values(buttons).map((item, i) => {
        const { isHidden, label, type, iconButtonProps, ...rest } = item;
        if (isHidden) return null;

        if (iconButtonProps) {
          const { color, ...others } = iconButtonProps;
          return <IconButton key={i} color={color} {...others} />;
        }

        return (
          <React.Fragment key={i}>
            <AppButton type={type} {...rest}>
              {label}
            </AppButton>
          </React.Fragment>
        );
      })}
    </ButtonGroupContainer>
  );
};

export default memo(ButtonGroup);
