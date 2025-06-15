import Grid2 from '@mui/material/Grid2';
import { memo } from 'react';

import { AppFormRowProps } from '.';

function FormHelperRow({
  fields,
  spacing = 2,
  alignItems,
  justifyContent,
}: AppFormRowProps) {
  const columnWidth = Math.floor(12 / fields?.length);

  return (
    <Grid2
      container
      spacing={spacing}
      alignItems={alignItems}
      justifyContent={justifyContent}
      size="grow"
    >
      {fields.map(({ ...field }, index) => {
        return (
          <Grid2
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
          </Grid2>
        );
      })}
    </Grid2>
  );
}

export default memo(FormHelperRow);
