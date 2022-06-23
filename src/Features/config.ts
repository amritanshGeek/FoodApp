import {
    PostData,
    GetData,
    MyResponse,
    NoErrorResponse,
    PutData,
  } from '../types';
  import { Platform } from 'react-native';
  
  const BASE_URL = `https://www.themealdb.com/api/json/v1/1/`;
  
  const API_KEY =
    Platform.OS === 'android'
      ? '1'
      : '1';
  
  const ApiConfig = {
    BASE_URL,
    API_KEY,
  };
  
  const EndPoint = {
    SEARCH: 'search.php',
    RANDOM: 'random.php',
    RANDOM_CATEGORIES: 'categories.php',
    ALL_LIST: 'list.php',
    FILTER: 'filter.php',
    MEAL_DETAILS: 'lookup.php',
  };
  
  export type Post = <T>(data: PostData) => Promise<MyResponse<T>>;
  
  export type Put = <T>(data: PutData) => Promise<MyResponse<T>>;
  
  export type Get = <T>(data: GetData) => Promise<MyResponse<T>>;

/**
 * combines base url with sub url
 * @param url sub url
 * @returns api url
 */
const getCombinedUrl = (
    url: string,
    params?: URLSearchParams,
  ) =>
     BASE_URL+ url +
    (params ? '?' + new URLSearchParams(params).toString() : '');
  
  /**
   * post method
   * @returns Promise
   *
   * ```javascript
   * eg:
   *
   * try {
   *  const response = post('/post/user',{
   *    // post data
   *  });
   * } catch (error: MyError) {
   *    // handle error
   * }
   * ```
   */
  const post: Post = async ({
    endPoint,
    body,
  }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const url = `${BASE_URL}${endPoint}`;
        const headers = {
          'Content-Type': 'application/json',
        //   Authorization: `Bearer ${userId}`,
        //   token: token,
        //   api_key: ApiConfig.API_KEY,
        } as any;
        console.log('headers:', headers);
  
        // initialize the request config
        const init: RequestInit = {
          headers,
          method: 'POST',
        //   body: JSON.stringify(body),
        };
  
        console.log('init',init);
  
        const response = await fetch(url, init);
        const responseJson = await response.json();
  
        if (response.ok) {
          resolve({
            status: true,
            data: responseJson,
            message: 'Fetched successfully',
          });
        } else {
          const error = processError(responseJson);
          reject(error);
        }
      } catch (error) {
        console.log('error:', error);
        const err = processError(error);
        console.log('err:', err);
        reject(err);
      }
    });
  };
  
  /**
   * put method
   * @returns Promise
   *
   * ```javascript
   * eg:
   *
   * try {
   *  const response = put('/post/user',{
   *    // put data
   *  });
   * } catch (error: MyError) {
   *    // handle error
   * }
   * ```
   */
  const put: Put = async ({
    endPoint,
    body,
  }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const url = `${BASE_URL}${endPoint}`;
  
        console.log('url:', url);
        // initialize the headers
        const headers = {
          'Content-Type': 'application/json',
        //   api_key: ApiConfig.API_KEY,
        } as any;
        console.log('headers:', headers);
  
        // initialize the request config
        const init: RequestInit = {
          headers,
          method: 'PUT',
        //   body: JSON.stringify(body),
        };
  
        console.log(init);
  
        const response = await fetch(url, init);
        const responseJson = await response.json();
  
        if (response.ok) {
          resolve({
            status: true,
            data: responseJson,
            message: 'Fetched Successfully',
          });
        } else {
          const error = processError(responseJson);
          reject(error);
        }
      } catch (error) {
        console.log('error:', error);
        const err = processError(error);
        console.log('err:', err);
        reject(err);
      }
    });
  };
  
  const get: Get = async ({
    endPoint,
    params,
  }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const url = getCombinedUrl(endPoint,params);
        console.log('url:', url);
  
        // initialize the headers
        const headers = {
          'Content-Type': 'application/json',
        } as any;
  
        // initialize the request config
        const init: RequestInit = {
          headers,
          method: 'GET',
        };

        console.log('init:', init);

        const response = await fetch(url, init);
        console.log('response:', response);
        const responseJson = await response.json();
        console.log('responseJson:', responseJson);
        if (response.ok) {
          resolve({
            status: true,
            data: responseJson,
            message: 'Fetched Successfully',
          });
        } else {
          const error = processError(responseJson);
          reject(error);
        }
      } catch (error) {
        console.log('error:', error);
        const err = processError(error);
        console.log('err:', err);
        reject(err);
      }
    });
  };
  
  /**
   * process the error
   * @param error Error
   * @returns MyError
   */
  const processError = (error: any) => {
    const status = false;
    const message = 'something went wrong';
    const response = error.message;
    return { status, message, response, error: JSON.stringify(error) };
  };
  
  const Api = {
    post,
    put,
    get,
    BASE_URL,
    API_KEY,
    ApiConfig,
    EndPoint,
  };
  
  export { Api };
  