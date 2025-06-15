import { memo } from 'react';

const gMemo: <T>(
  component: T,
  propsAreEqual?: (
    prevProps: React.PropsWithChildren<T>,
    nextProps: React.PropsWithChildren<T>,
  ) => boolean,
) => T = memo;

export default gMemo;
