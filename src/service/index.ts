import Taro from '@tarojs/taro';
import { authStore } from '@/src/stores/auth';

import interceptors from './interceptors';

const LOCAL_IP = `http://127.0.0.1`;

const MOCK_PORT = { h5: '9527', weapp: '9528' }[process.env.TARO_ENV];

const MOCK_BASE_URL = `${LOCAL_IP}:${MOCK_PORT}`;

const getBaseUrl = () => {
  if (process.env.TARO_ENV === 'weapp') {
    const {
      miniProgram: { envVersion },
    } = Taro.getAccountInfoSync();
    switch (envVersion) {
      case 'develop':
        return MOCK_BASE_URL;
      case 'trial':
        return '';
      case 'release':
        return '';
      default:
        return '';
    }
  } else {
    switch (process.env.NODE_ENV) {
      case 'development':
        return MOCK_BASE_URL;
      case 'production':
        return '';
      default:
        return '';
    }
  }
};

export const BASE_URL = getBaseUrl();

interceptors.forEach(i => Taro.addInterceptor(i));

export interface ExtraConfig {
  showLoading?: boolean;
  showStatusBarLoading?: boolean;
  isHasToken?: boolean;
  showErrorToast?: boolean;
}

export type CustomData = { [key: string]: any };
//后台返回的数据格式
export interface CustomResult<D = unknown> {
  data: D;
  code: number;
  message: string;
}

type OmitMethodCustomOption = Omit<Taro.request.Option<CustomResult, CustomData>, 'method'> & {
  baseUrl?: string;
  extraConfig?: ExtraConfig;
};

export type CustomOption = Omit<OmitMethodCustomOption, 'url'>;

class ApiService {
  static baseOptions<D>(
    { url, data, header, baseUrl, extraConfig, ...otherConfig }: OmitMethodCustomOption,
    method: keyof Taro.request.Method
  ) {
    extraConfig = {
      showLoading: true,
      isHasToken: true,
      showErrorToast: true,
      showStatusBarLoading: false,
      ...(extraConfig ?? {}),
    };
    //将额外配置传递到拦截器中
    data = {
      extraConfig,
      ...(data ?? {}),
    };
    const contentType = ['POST', 'PUT'].includes(method) ? 'application/json' : 'application/x-www-form-urlencoded';

    const option: Taro.request.Option = {
      url: (baseUrl ?? BASE_URL) + url,
      data,
      method,
      header: {
        'content-type': contentType,
        //TODO添加自己的token
        Authorization: extraConfig.isHasToken ? authStore.getState().token : '',
        ...header,
      },
      ...otherConfig,
    };

    return Taro.request<D, CustomData>(option).then(res => {
      return res.data;
    });
  }
  private static getMethod = (method: keyof Taro.request.Method) => {
    const apiMethod = <D>(url, option?: CustomOption): Promise<D> => {
      return this.baseOptions<D>({ url, ...option }, method);
    };
    return apiMethod;
  };
  static get = this.getMethod('GET');
  static post = this.getMethod('POST');
  static put = this.getMethod('PUT');
  static delete = this.getMethod('DELETE');
}

export default ApiService;
