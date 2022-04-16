import Taro from "@tarojs/taro";
import interceptors, { HTTP_STATUS } from "./interceptors";

const BASE_URL = "";

interceptors.forEach((i) => Taro.addInterceptor(i));

export interface ExtraData {
  showLoad?: boolean;
  hasToken?: boolean;
  showErrorToast?: boolean;
}

export type CustomData = ExtraData & { [key: string]: any };

type OmitMethodCustomOption = Omit<
  Taro.request.Option<CustomResult, CustomData>,
  "method"
> & {
  baseUrl?: string;
};

type CustomOption = Omit<OmitMethodCustomOption, "url">;

export interface CustomResult {
  result: any;
  resultCode: HTTP_STATUS;
  [key: string]: any;
}

const ApiService = {
  baseOptions(
    { url, data, header, baseUrl, ...otherConfig }: OmitMethodCustomOption,
    method: keyof Taro.request.Method
  ) {
    data = {
      showLoad: true,
      hasToken: true,
      showErrorToast: false,
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
        Authorization: data.hasToken ? "" : "",
        ...header,
      },
      ...otherConfig,
    };
    if (data.showLoad) {
      Taro.showLoading({
        title: "请稍候...",
        mask: true,
      });
    }
    return Taro.request<CustomResult, CustomData>(option);
  },

  get(url, option?: CustomOption): Taro.RequestTask<CustomResult> {
    return this.baseOptions({ url, ...option }, "GET");
  },
  post(url, option?: CustomOption): Taro.RequestTask<CustomResult> {
    return this.baseOptions({ url, ...option }, "POST");
  },
  put(url, option?: CustomOption): Taro.RequestTask<CustomResult> {
    return this.baseOptions({ url, ...option }, "PUT");
  },
  delete(url, option?: CustomOption): Taro.RequestTask<CustomResult> {
    return this.baseOptions({ url, ...option }, "DELETE");
  },
};

export default ApiService;
