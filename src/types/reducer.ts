export type MyResponse<T = any> = {
  status: boolean;
  data: T;
  message: string;
};

export type NoErrorResponse<T = any> = {
  status: boolean;
  data: T;
  error: any;
  message: string;
};

export type MyError = {
  status: string;
  message: string;
  error: any;
};

export type PostData = {
  endPoint: string;
  userId?: string;
  token?: string;
  body?: object;
};

export type PutData = PostData;
export type GetData = {
  endPoint: string;
  userId?: string;
  token?: string;
  params?: any;
};

export type ReducerState<T = any> = {
  isLoading: boolean;
  data?: T;
  error?: MyError;
};
