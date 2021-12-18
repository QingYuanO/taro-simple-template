// eslint-disable-next-line import/no-commonjs
const path = require("path");

// eslint-disable-next-line no-unused-vars
module.exports = (ctx, options) => {
  ctx.registerCommand({
    // 命令名
    name: "generate-router-methods",
    async fn() {
      console.log("开始生成");
      const appConfigPath = ctx.helper.resolveMainFilePath(
        path.resolve(ctx.paths.sourcePath, "./app.config")
      );
      const appConfig = ctx.helper.readConfig(appConfigPath);
      let pagePath = [...appConfig.pages.map((page) => `/${page}`)];
      if (appConfig.subPackages) {
        appConfig.subPackages.forEach((package) => {
          package.pages.forEach((packagePage) => {
            pagePath.push(`/${package.root}/${packagePage}`);
          });
        });
      }
      // console.log(appConfig);
      console.log(pagePath);
      ctx.helper.fs.writeFile(
        ctx.paths.sourcePath + "/utils/toRouterPage.ts",
        generateToRouterMethods(pagePath),
        function (err) {
          console.log(`生成--路由函数（${pagePath.length}个）`);
          if (err) {
            throw err;
          }
        }
      );
    },
  });
};

function generateToRouterMethods(pagePath) {
  const staticStr = `
import Taro, { EventChannel } from "@tarojs/taro";

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
  url = url + ganerateParams(params ?? {});
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

const ganerateParams = (params: { [key: string]: any }) => {
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
  `;

  const toRouterMethodsStr = pagePath
    .map((item) => {
      const routerSplit = item
        .split("/")
        .map(
          (routerSplitItem) =>
            routerSplitItem.charAt(0).toUpperCase() + routerSplitItem.slice(1)
        );
      let methodName = "";
      if (routerSplit.length > 4) {
        methodName = routerSplit[1] + routerSplit[3];
      } else {
        methodName = routerSplit[2];
      }
      return `
export const to${
        methodName.charAt(0).toUpperCase() + methodName.slice(1)
      }Page = <P>(option?: ToRouterType<P>) => {
  navigateType("${item}", option);
};
`;
    })
    .join("\n");

  return staticStr + toRouterMethodsStr;
}
