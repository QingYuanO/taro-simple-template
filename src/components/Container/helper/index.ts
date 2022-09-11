import { Children, isValidElement, ReactElement, ReactNode } from 'react';
import {
  getMenuButtonBoundingClientRect,
  getSystemInfoSync,
} from '@tarojs/taro';
import Container from '..';
import { ContainerChildren } from '../types';

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

export function findContainerChildren(node?: ReactNode): ContainerChildren {
  const children: ContainerChildren = {
    navbar: undefined,
    footer: undefined,
    content: undefined,
    other: [],
  };

  Children.forEach(node, (child: ReactNode) => {
    if (isValidElement(child)) {
      const element = child as ReactElement;
      if (element.type === Container.Navbar) {
        children.navbar = element as ReturnType<typeof Container.Navbar>;
      } else if (element.type === Container.Content) {
        children.content = element;
      } else if (element.type === Container.Footer) {
        children.footer = element as ReturnType<typeof Container.Footer>;
      } else {
        children.other!.push(child);
      }
    } else {
      children.other!.push(child);
    }
  });

  return children;
}

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
