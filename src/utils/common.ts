const getOrDefault = <T extends string | number | null | undefined>(
  value: T,
  defaultValue: T = '-' as T
) => {
  return value || defaultValue;
};

const isValidUrl = (url?: string | null) => {
  if (!url) return false;

  try {
    return Boolean(new URL(url));
  } catch {
    return false;
  }
};

export { getOrDefault, isValidUrl };
