import {
  getMenuButtonBoundingClientRect,
  getSystemInfoSync,
} from '@tarojs/taro';

const globalSystemInfo = getSystemInfoSync();
export const getSystemInfo = () => {
  return globalSystemInfo ?? getSystemInfoSync();
};

export const getNavBarHeight = () => {
  if (process.env.TARO_ENV === 'weapp') {
    const menuButtonBounding = getMenuButtonBoundingClientRect();
    return menuButtonBounding.top + menuButtonBounding.height + 5;
  }
  return 42;
};
export const getSafeArea = () => {
  const systemInfo = getSystemInfo();
  const safeBottom =
    systemInfo.screenHeight - (systemInfo?.safeArea?.bottom ?? 0);
  const safeTop = systemInfo.safeArea?.top;
  const safeHeight = systemInfo.safeArea?.height;
  return {
    safeBottom,
    safeTop,
    safeHeight,
  };
};
export const isIPhoneX = () => {
  const { safeArea, model } = getSystemInfo();
  return model.includes('iPhone') && (safeArea?.top ?? 0) > 20;
};


/**
 * 统一路由路径格式
 * @param path 路由路径
 */
export const formattedRoutePath = (path: string) => {
  if (!path) {
    return path;
  }
  let formattedPath = path.split('?')[0];
  const firstChar = path.charAt(0);

  if (firstChar !== '/') {
    formattedPath = `/${path}`;
  }

  return formattedPath;
};
