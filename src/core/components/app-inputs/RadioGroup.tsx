import React, { memo } from 'react';

import { FormControl, FormLabel } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import { AppRadioProps } from './types';

const AppRadio = ({
  row = true,
  radioProps,
  options,
  formLabelProps,
  label,
  defaultValue,
  ...rest
}: AppRadioProps) => {
  const { slotProps = {} } = formLabelProps || {};
  const { typography } = slotProps;

  return (
    <FormControl>
      <FormLabel id="buttons-group-label">{label}</FormLabel>
      <RadioGroup
        row={row}
        defaultValue={defaultValue}
        aria-label="controlled"
        name="controlled"
        {...rest}
      >
        {options?.map((radio) => (
          <FormControlLabel
            key={radio?.id}
            value={radio?.id}
            label={radio?.name}
            control={<Radio {...radioProps} />}
            slotProps={{
              typography: { fontSize: 14, ...typography },
              ...slotProps,
            }}
            {...formLabelProps}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default memo(AppRadio);
