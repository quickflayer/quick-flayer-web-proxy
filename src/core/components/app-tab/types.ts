import { BoxProps } from '@mui/material/Box';
import { TabsProps } from '@mui/material/Tabs';

export type TabPanelProps = {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
};

type TabData = {
  label: string;
  path: string;
  disabled?: boolean;
  icon?: string;
};

export type AppTabProps = {
  tabs: TabData[];
  disabled?: boolean;
  panelContainerProps?: BoxProps;
  wrapperProps?: BoxProps;
  orientation?: TabsProps['orientation'];
  variant?: 'standard' | 'outlined';
  children?: React.ReactNode;
};
