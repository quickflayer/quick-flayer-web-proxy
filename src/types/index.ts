// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any;

export type TError = {
  message: string;
  status: number;
  data: Any;
};

export type TryCatchResult<T> =
  | { success: true; data: T }
  | { success: false; error: TError };
