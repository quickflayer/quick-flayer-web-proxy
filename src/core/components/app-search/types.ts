export type SearchProps = {
  query?: string;
  onChange?: (newQuery: string) => void;
};

export type SearchIconProps = {
  hasValue: boolean;
  onClear: () => void;
};
