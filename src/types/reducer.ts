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
    signal?: AbortSignal;
    isApiKeyNotNeeded?: boolean;
  };
  
  export type PutData = PostData;
  export type GetData = {
    endPoint: string;
    isGoogle?: boolean;
    userId?: string;
    token?: string;
    params?: any;
    signal?: AbortSignal;
    isApiKeyNotNeeded?: boolean;
  };
  
  export type ReducerState<T = any> = {
    isLoading: boolean;
    data?: T;
    error?: MyError;
  };
  