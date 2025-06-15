import { useCallback, useRef } from 'react';

import { Any } from '@/types';

function useDebounce<T extends (...args: Any[]) => void>(
  fn: T,
  delay: number,
): T {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay],
  );

  return debouncedFn as T;
}

export default useDebounce;
