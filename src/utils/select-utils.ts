import { BaseOption, NumStr } from '@/types';

export const findOptionByValue = <T extends BaseOption>(
  options: T[],
  value: NumStr | null,
  getOptionValue: (option?: T) => string = (option) => `${option?.name}`,
): T | undefined => {
  return options.find((option) => getOptionValue(option) === value);
};
