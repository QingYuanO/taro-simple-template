import Taro, { request } from "@tarojs/taro";
import interceptors from "./interceptors";

const BASE_URL = "";

interceptors.forEach((i) => Taro.addInterceptor(i));

export interface ExtraData {
  showLoad?: boolean;
  hasToken?: boolean;
  showErrorToast?: boolean;
}
interface OptionParams {
  url: string;
  data?: ExtraData & { [key: string]: any };
}
const ApiService = {
  baseOptions({ url, data }: OptionParams, method: keyof Taro.request.method) {
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
      url: BASE_URL + url,
      data,
      method,
      header: {
        "content-type": contentType,
        Authorization: data.hasToken ? "" : "",
      },
    };
    if (data.showLoad) {
      Taro.showLoading({
        title: "请稍候...",
        mask: true,
      });
    }
    return Taro.request(option);

  },
  get(url, data: ExtraData) {
    let option = { url, data };
    return this.baseOptions(option, "GET");
  },
  post(url, data: ExtraData) {
    let params = { url, data };
    return this.baseOptions(params, "POST");
  },
  put(url, data: ExtraData) {
    let option = { url, data };
    return this.baseOptions(option, "PUT");
  },
  delete(url, data: ExtraData) {
    let option = { url, data };
    return this.baseOptions(option, "DELETE");
  },
};

export default ApiService;
