import { Box, BoxProps, styled } from '@mui/material';

type ExtendedBoxProps = BoxProps & {
  hasvalue?: string;
};

const isTrue = (value?: string): boolean => value === 'true';

export const IconWrapper = styled(Box)<ExtendedBoxProps>(({ hasvalue }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 30,
  cursor: isTrue(hasvalue) ? 'pointer !important' : 'auto',
  height: '100%',

  ['& .close-icon']: {
    position: 'absolute',
    fontSize: 20,
    cursor: isTrue(hasvalue) ? 'pointer !important' : 'auto',
    opacity: isTrue(hasvalue) ? 1 : 0,
    transform: isTrue(hasvalue) ? 'rotate(180deg)' : 'rotate(90deg)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  },

  ['& .search-icon']: {
    position: 'absolute',
    fontSize: 20,
    opacity: isTrue(hasvalue) ? 0 : 1,
    transform: isTrue(hasvalue) ? 'rotate(-90deg)' : 'rotate(0deg)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  },
}));
