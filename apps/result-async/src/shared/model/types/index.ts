export interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}

export interface BaseResponse<T> {
  data: T;
  message: string;
  status: number;
}

export const removeUndefined = <T>(arr: (T | undefined)[]): T[] => {
  return arr.filter((item): item is T => item !== undefined);
}; 