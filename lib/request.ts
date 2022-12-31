import { reactive, ref, toRaw, toRefs } from 'vue';
import { createEventHook } from './eventHook';
import {
  UseRequestReactiveData,
  UseRequestConfig,
  CreateRequestOptions,
  RequestInstance,
  UseRequestReturnBase,
} from './types';

const UniRequestInstance = uni.request;
const UseRequestDefaultConfig: UseRequestConfig = { immediate: true, header: {} };

export function createRequest(instanceOptions: CreateRequestOptions) {
  function requestInstance(options: UniApp.RequestOptions) {
    const url = options.url && options.url.startsWith('http') ? options.url : instanceOptions.baseUrl + options.url;
    return UniRequestInstance.call(null, { instanceOptions, url });
  }

  return createRequestByInstance(requestInstance, instanceOptions);
}

function createRequestByInstance(requestInstance: RequestInstance, instanceOption: CreateRequestOptions) {
  return function useRequest<T = any>(
    url: string,
    options?: Omit<UniNamespace.RequestOptions, 'url'>
  ): UseRequestReturnBase<T> {
    const successEvent = createEventHook<UniNamespace.RequestSuccessCallbackResult>();
    const errorEvent = createEventHook<any>();
    const finallyEvent = createEventHook<any>();
    const reqTask = ref<null | UniApp.RequestTask>(null);

    // 合并配置：{...默认配置,...用户自定义实例配置, ...传参配置 }
    const instanceOpts = instanceOption?.options || {};
    const realConfig: UseRequestConfig = { ...UseRequestDefaultConfig, ...instanceOpts, ...options };

    const reactiveRes = reactive<UseRequestReactiveData>({
      data: null,
      error: null,
      isLoading: false,
      statusCode: 200,
      response: {} as UniNamespace.RequestSuccessCallbackResult,
    });

    function execCancel() {
      if (reqTask.value && reactiveRes.isLoading) {
        reqTask.value.abort();
      } else {
        console.log('该请求未发起，无法取消，建议用 isLoading 判断请求是否发起');
      }
    }

    if (realConfig.immediate) {
      execute();
    }

    // 执行请求逻辑 execute
    async function execute(execConfig?: UseRequestConfig): Promise<UseRequestReactiveData<T>> {
      if (execConfig && Object.keys(execConfig).length) {
        Object.assign(realConfig, execConfig);
      }

      const { handleError, beforeRequest, afterRequest } = realConfig;

      return new Promise(async (resolve, reject) => {
        try {
          //! 请求之前
          if (beforeRequest && typeof beforeRequest === 'function') {
            const bfRes = await beforeRequest({
              url: url,
              options: realConfig,
            });

            if (bfRes.options && Object.keys(bfRes.options).length) {
              Object.assign(realConfig, bfRes.options);
            }
          }

          reactiveRes.isLoading = true;
          reqTask.value = requestInstance({
            url,
            ...realConfig,
            async success(res) {
              if (afterRequest && typeof afterRequest === 'function') {
                const afRes = await afterRequest({
                  data: res.data,
                  response: res,
                });

                if (afRes.response && Object.keys(afRes.response)) {
                  Object.assign(res, afRes.response);
                }
              }

              reactiveRes.response = res;
              reactiveRes.data = res.data;
              reactiveRes.statusCode = res.statusCode;
              successEvent.trigger(res);
              resolve(toRaw(reactiveRes));
            },
            fail({ errMsg }) {
              reactiveRes.error = errMsg;
              errorEvent.trigger(errMsg);
              reject(errMsg);
            },
            async complete() {
              reactiveRes.isLoading = false;
              reqTask.value = null;
              finallyEvent.trigger(null);
            },
          });
        } catch (error) {
          reactiveRes.error = error;
          if (handleError && typeof handleError === 'function') {
            handleError(error);
          }
          errorEvent.trigger(error);
          reject(error);
        }
      });
    }

    return {
      ...toRefs(reactiveRes),
      execute,
      cancel: execCancel,
      onSuccess: successEvent.on,
      onError: errorEvent.on,
      onFinally: finallyEvent.on,
    };
  };
}
