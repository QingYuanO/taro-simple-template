import { ViewProps } from '@tarojs/components';
import { NodesRef } from '@tarojs/taro';
import { ReactNode } from 'react';

export interface IconProps {
  color: string;
  size: number;
}

export interface ContainerChildren {
  navbar?: ReactNode;
  footer?: ReactNode;
  other?: ReactNode[];
}

export type ContainerProps = {
  children?: ReactNode;
  /** 是否自动給content添加NavBar高度的顶部边距，默认true */
  hasNavBarTop?: boolean;
  /** 是否自动給content添加Footer高度的底部边距，默认true */
  hasFooterBottom?: boolean;
} & ViewProps;

export interface FooterProps {
  children?: ReactNode;
  /** 是否自动生成一个占位组件，一般被用于单独使用时 */
  hasSeat?: boolean;
  hasSafe?: boolean;
  /** 组件的布局改变时的回调 */
  onFooterRectChange?: (dom: NodesRef.BoundingClientRectCallbackResult) => void;
}
export interface FooterRef {
  /** 获取组件的布局信息 */
  getFooterRect: (callback?: (rect: NodesRef.BoundingClientRectCallbackResult) => void) => void;
}
export interface NavbarProps {
  /** 设置title时，其他属性失效 */
  children?: ReactNode;
  /** 左边的图标 */
  leftIcon?: ReactNode;
  /** 标题 */
  title?: string;
  /** 是否自动生成一个占位组件，一般被用于单独使用时 */
  hasSeat?: boolean;
  /** 标题 className */
  titleClassName?: string;
  /** 背景颜色 */
  bgColor?: string;
  /** 默认的左边按钮Size */
  defaultLeftIconSize?: number;
  /** 默认的左边按钮Color */
  defaultLeftColor?: string;
}
