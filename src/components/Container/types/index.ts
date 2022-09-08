import { ViewProps } from "@tarojs/components";
import { NodesRef } from "@tarojs/taro";
import { ReactNode } from "react";

export interface IconProps {
  color: string;
  size: number;
}

export interface ContainerChildren {
  navbar?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  other?: ReactNode[];
}

export type ContainerProps = {
  children?: ReactNode;
  hasNavBarTop?: boolean;
  hasFooterBottom?: boolean;
} & ViewProps;
export interface ContentProps extends ViewProps {
  children?: ReactNode | null;
}

export interface FooterProps {
  children?: ReactNode;
  hasSeat?: boolean;
  onFooterRectChange?: (
    dom: NodesRef.BoundingClientRectCallbackResult
  ) => void;
}
export interface FooterRef {
  getFooterRect: (
    callback?: (rect: NodesRef.BoundingClientRectCallbackResult) => void
  ) => void;
}
export interface NavbarProps {
  children?: ReactNode;
  leftIcon?: ReactNode;
  title?: string;
  hasSeat?: boolean;
  titleClassName?: string;
  bgColor?: string;
  defaultLeftIconSize?: number;
  defaultLeftColor?: string;
}
