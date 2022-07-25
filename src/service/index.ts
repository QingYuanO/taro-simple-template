import Taro from "@tarojs/taro";
import interceptors, { HTTP_STATUS } from "./interceptors";

export const BASE_URL = "";

interceptors.forEach((i) => Taro.addInterceptor(i));

export interface ExtraData {
  showLoad?: boolean;
  showStatusBarLoad?: boolean;
  hasToken?: boolean;
  showErrorToast?: boolean;
}

export type CustomData = ExtraData & { [key: string]: any };

type OmitMethodCustomOption = Omit<
  Taro.request.Option<CustomResult, CustomData>,
  "method"
> & {
  baseUrl?: string;
  extraData?: ExtraData;
};

export type CustomOption = Omit<OmitMethodCustomOption, "url">;

export interface CustomResult<D = unknown> {
  data: D;
  code: number;
  message: string;
}

class ApiService {
  static baseOptions<D>(
    {
      url,
      data,
      header,
      baseUrl,
      extraData,
      ...otherConfig
    }: OmitMethodCustomOption,
    method: keyof Taro.request.Method
  ) {
    extraData = {
      showLoad: true,
      hasToken: true,
      showErrorToast: true,
      showStatusBarLoad: false,
      ...(extraData ?? {}),
    };
    //将额外配置传递到拦截器中
    data = {
      ...extraData,
      ...(data ?? {}),
    };
    const contentType = ["POST", "PUT"].includes(method)
      ? "application/json"
      : "application/x-www-form-urlencoded";

    const option: Taro.request.Option = {
      url: (baseUrl ?? BASE_URL) + url,
      data,
      method,
      header: {
        "content-type": contentType,
        //TODO添加自己的token
        Authorization: extraData.hasToken ? "" : "",
        ...header,
      },
      ...otherConfig,
    };
    if (extraData.showStatusBarLoad) {
      Taro.showNavigationBarLoading();
    } else if (extraData.showLoad) {
      Taro.showLoading({
        title: "请稍候...",
        mask: true,
      });
    }
    return Taro.request<CustomResult<D>, CustomData>(option).then((res) => {
      return res.data;
    });
  }
  private static getMethod = (method: keyof Taro.request.Method) => {
    function apiMethod<D>(url, option?: CustomOption): Promise<D> {
      return this.baseOptions({ url, ...option }, method);
    }
    return apiMethod;
  };
  static get = this.getMethod("GET");
  static post = this.getMethod("POST");
  static put = this.getMethod("PUT");
  static delete = this.getMethod("DELETE");
}

export default ApiService;
