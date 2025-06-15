import { memo } from 'react';

import Grid from '@mui/material/Grid';

import { AppFormRowProps } from '.';

function FormHelperRow({
  fields,
  spacing = 2,
  alignItems,
  justifyContent,
}: AppFormRowProps) {
  const columnWidth = Math.floor(12 / fields?.length);

  return (
    <Grid
      container
      spacing={spacing}
      alignItems={alignItems}
      justifyContent={justifyContent}
      size="grow"
    >
      {fields.map(({ ...field }, index) => {
        return (
          <Grid
            key={index}
            size={
              field.size
                ? typeof field?.size === 'object'
                  ? { ...field.size }
                  : field.size
                : columnWidth || 6
            }
          >
            {field.component}
          </Grid>
        );
      })}
    </Grid>
  );
}

export default memo(FormHelperRow);
