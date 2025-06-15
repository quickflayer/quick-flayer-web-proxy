import { ElementType, ReactNode } from 'react';

import { ICONS } from './icons-const';

type MappedIconKey = (typeof ICONS)[keyof typeof ICONS];

export type MappedIcons = {
  [K in MappedIconKey]: ElementType<{ children?: ReactNode }>;
};
