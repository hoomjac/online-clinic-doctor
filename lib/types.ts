import { Ref } from 'vue';
import { EventHookOn } from './eventHook';

export interface UseRequestReactiveData<DR = any> {
  data: DR | null;
  error: any;
  isLoading: boolean;
  statusCode: number;
  response: UniNamespace.RequestSuccessCallbackResult | null;
}

export type RequestInstance = (options: UniApp.RequestOptions) => UniApp.RequestTask;

export interface CreateRequestOptions {
  /**
   * The base URL that will be prefixed to all urls
   */
  baseUrl?: string;
  /**
   * Default Options for the useFetch function
   */
  options?: UseRequestConfig;
}

export interface BeforeRequestContext {
  /**
   * The computed url of the current request
   */
  url: string;
  /**
   * The request options of the current request
   */
  options: UseRequestConfig;
}

export interface AfterRequestContext<T = any> {
  response: UniNamespace.RequestSuccessCallbackResult | UniNamespace.GeneralCallbackResult;
  data: T | null;
}

export type UseRequestConfig = Omit<UniApp.RequestOptions, 'url' | 'success' | 'fail' | 'complete'> & {
  /* 
   是否立即发起请求
  */
  immediate?: boolean;
  /**
   * Will run immediately before the request is dispatched
   */
  beforeRequest?: (ctx: BeforeRequestContext) => Partial<BeforeRequestContext> | Promise<Partial<BeforeRequestContext>>;
  /**
   * Will run immediately after the request is returned.
   * Runs after any 2xx response
   */
  afterRequest?: (ctx: AfterRequestContext) => Promise<Partial<AfterRequestContext>> | Partial<AfterRequestContext>;

  // 错误处理钩子
  handleError?: (error: any) => void;
};

export interface UseRequestReturnBase<T = any> {
  /**
   * Any fetch errors that may have occurred
   */
  error: Ref<any>;
  /**
   * The fetch response body, may either be JSON or text
   */
  data: Ref<T | null>;
  /**
   * Indicates if the request is currently being fetched.
   */
  isLoading: Ref<boolean>;

  /**
   * Manually call the request
   * (default not throwing error)
   */
  execute: (config?: UseRequestConfig) => Promise<UseRequestReactiveData<T>>;

  /**
   * The statusCode of the HTTP fetch response
   */
  statusCode: Ref<number | null>;
  /**
   * The raw response of the fetch response
   */
  response: Ref<UniApp.RequestSuccessCallbackResult | null>;

  /**
   * Fires after the fetch request has finished
   */
  onSuccess: EventHookOn<UniApp.RequestSuccessCallbackResult>;

  /**
   * Fires after a fetch request error
   */
  onError: EventHookOn;

  /**
   * Fires after a fetch has completed
   */
  onFinally: EventHookOn;

  cancel: (msg?: string) => void;
}
