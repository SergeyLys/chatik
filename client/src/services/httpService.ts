import axios, {
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  Canceler,
  CancelTokenSource,
  Method
} from 'axios';
import {getCookie} from "../helpers/getCookie";
export const apiInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_ENV
});

export type Canceler = Canceler;

export interface Request extends AxiosPromise {
  cancel: Canceler;
}

export type Method = Method;

export const httpService = (params: AxiosRequestConfig): Request => {
  const source: CancelTokenSource = axios.CancelToken.source();
  const request = apiInstance({
    ...params,
    headers: {
      ...params.headers,
      'x-access-token': getCookie('usertoken', document.cookie)
    },
    cancelToken: source.token
  }) as Request;

  request.cancel = (): void => source.cancel();
  return request;
};

httpService.use = (interceptor: Function): void =>
  interceptor(apiInstance.interceptors.request, apiInstance.interceptors.response);
