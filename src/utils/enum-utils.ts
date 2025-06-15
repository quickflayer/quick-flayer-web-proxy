import { startCase, toLower, find } from 'lodash';

import { Any, BaseOption } from '@/types';

const toSelect = <T extends Any = BaseOption>(
  val: string[] | Record<string, string>,
  idKey: string = 'id',
  nameKey: string = 'name',
): T[] => {
  const values = Array.isArray(val) ? val : Object.values(val);

  return values.map((item) => ({
    [idKey]: item,
    [nameKey]: startCase(toLower(item)),
  })) as T[];
};

const fromSelect = <T extends Any, K extends keyof T>(
  value: Any,
  options: T[],
  valueKey: K = 'id' as K,
): T | null => {
  const result = find(
    options,
    (option) => option && option?.[valueKey as K] === value,
  );
  return result ?? null;
};

export { toSelect, fromSelect };
