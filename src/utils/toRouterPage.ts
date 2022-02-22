import Taro, { EventChannel } from "@tarojs/taro";
import IndexParams from '../pages/index/route.config'
import PackageAHomeParams from '../packageA/pages/home/route.config'

export enum NavigateType {
  /** 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 Router.back 可以返回到原页面。小程序中页面栈最多十层。 */
  navigateTo = "navigateTo",
  /** 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。 */
  redirectTo = "redirectTo",
  /** 关闭所有页面，打开到应用内的某个页面 */
  reLaunch = "reLaunch",
  /** 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面 */
  switchTab = "switchTab",
}

interface ToRouterType<P> {
  params?: P;
  type?: NavigateType /** 接口调用结束的回调函数（调用成功、失败都会执行） */;
  complete?: (res: TaroGeneral.CallbackResult) => void;
  /** 页面间通信接口，用于监听被打开页面发送到当前页面的数据。 */
  events?: TaroGeneral.IAnyObject;
  /** 接口调用失败的回调函数 */
  fail?: (res: TaroGeneral.CallbackResult) => void;
  /** 接口调用成功的回调函数 */
  success?: (
    res: TaroGeneral.CallbackResult & { eventChannel: EventChannel }
  ) => void;
}

const navigateType = <P>(url: string, option?: ToRouterType<P>) => {
  const { type, params, success, fail, complete, events } = option ?? {
    type: NavigateType.navigateTo,
    params: {},
    success: () => {},
    fail: () => {},
    complete: () => {},
    events: undefined,
  };
  url = url + generateParams(params ?? {});
  switch (type) {
    case NavigateType.navigateTo:
      Taro.navigateTo({ url, success, fail, complete, events });
      break;
    case NavigateType.redirectTo:
      Taro.redirectTo({ url, success, fail, complete });
      break;
    case NavigateType.reLaunch:
      Taro.reLaunch({ url, success, fail, complete });
      break;
    case NavigateType.switchTab:
      Taro.switchTab({ url, success, fail, complete });
      break;
    default:
      Taro.navigateTo({ url, success, fail, complete, events });
  }
};

const generateParams = (params: { [key: string]: any }) => {
  return (
    "?" +
    Object.entries(params).reduce((total, cur, idx) => {
      const val = cur[0] + "=" + cur[1];
      if (idx === Object.entries(params).length - 1) {
        return total + val;
      } else {
        return total + val + "&";
      }
    }, "")
  );
};
  
export const toIndexPage = (option?: ToRouterType<IndexParams>) => {
  navigateType("/pages/index/index", option);
};

          
export const toPackageAHomePage = (option?: ToRouterType<PackageAHomeParams>) => {
  navigateType("/packageA/pages/home/index", option);
};

          