// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any;

export type TError = {
  message: string;
  status: number;
  data: Any;
};

export type TryCatchOptions = {
  fn: () => Promise<Any>;
  logger?: (message: string, ...optionalParams: Any[]) => void;
  fallbackError?: string;
  finally?: () => void;
};

export type TryCatchResult<T> =
  | { success: true; data: T }
  | { success: false; error: TError };

export type BaseOption = { id?: string | number; name?: string } | null;

export type NumStr = number | string;
