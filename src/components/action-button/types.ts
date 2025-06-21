import { IconButtonProps } from '@core/components/icon-button/type';

import { NumStr } from '@/types';

export type Actions = 'update' | 'delete';

export type ActionButtonProps = {
  for: Actions;
  onClick?: (id: number, name?: string) => void;
  id?: NumStr;
  name?: string;
};

export type ActionItems = Record<Actions, IconButtonProps>;
