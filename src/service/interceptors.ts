import Taro from '@tarojs/taro';

export enum HTTP_STATUS {
  SUCCESS = 200,
  CREATED = 201,
  ACCEPTED = 202,
  CLIENT_ERROR = 400,
  AUTHENTICATE = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}
function showError(message, show, res?: any) {
  show &&
    Taro.showToast({
      title: message || '请求异常',
      icon: 'none',
    });
  return Promise.reject(res.data ?? res);
}

const customInterceptor = function (chain) {
  let requestParams = chain.requestParams;
  //剔除掉额外配置参数
  const {
    data: { showErrorToast, showLoad, showStatusBarLoad, ...realRequestParams },
  } = requestParams;

  requestParams.data = realRequestParams;
  return chain
    .proceed(requestParams)
    .catch((res) => {
      // 这个catch需要放到前面才能捕获request本身的错误，因为showError返回的也是Promise.reject
      console.error(res);
      return showError(res.errMsg, showErrorToast);
    })
    .then((res) => {
      // 只要请求成功，不管返回什么状态码，都走这个回调
      if (showStatusBarLoad) {
        Taro.hideNavigationBarLoading();
      } else if (showLoad) {
        Taro.hideLoading();
      }
      const codeStatus = [res.statusCode, res.data.code];
      if (codeStatus.includes(HTTP_STATUS.NOT_FOUND)) {
        return showError(
          res.data.message || '请求资源不存在',
          showErrorToast,
          res,
        );
      } else if (codeStatus.includes(HTTP_STATUS.BAD_GATEWAY)) {
        return showError(
          res.data.message || '服务端出现了问题',
          showErrorToast,
          res,
        );
      } else if (codeStatus.includes(HTTP_STATUS.SERVER_ERROR)) {
        return showError(
          res.data.message || '后端出现了问题',
          showErrorToast,
          res,
        );
      } else if (codeStatus.includes(HTTP_STATUS.FORBIDDEN)) {
        return showError(
          res.data.message || '没有权限访问',
          showErrorToast,
          res,
        );
      } else if (codeStatus.includes(HTTP_STATUS.AUTHENTICATE)) {
        return showError(res.data.message || '需要鉴权', showErrorToast, res);
      } else if (res.statusCode >= 400) {
        return showError(res.data?.message, showErrorToast, res);
      } else {
        /**
         * res原始数据格式
          ---------
          开发者服务器返回的数据
          data: T
          开发者服务器返回的 HTTP Response Header
          header: TaroGeneral.IAnyObject
          开发者服务器返回的 HTTP 状态码
          statusCode: number
          调用结果
          errMsg: string
          cookies
          cookies?: string[]
         */
        return res;
      }
    });
};

const interceptors = [customInterceptor]; //Taro.interceptors.logInterceptor

export default interceptors;
