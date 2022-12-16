import { View } from '@tarojs/components';
import { Children, isValidElement, ReactElement, ReactNode, useMemo } from 'react';
import useNodeRect from '@/hooks/useNodeRect';
import themeStore from '@/utils/theme';
import Taro from '@tarojs/taro';
import './index.less';
import { getNavBarHeight } from './helper';
import { Content, Footer, Navbar } from './components';
import { ContainerChildren, ContainerProps } from './types';

function findContainerChildren(node?: ReactNode): ContainerChildren {
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
        children.navbar = element;
      } else if (element.type === Container.Content) {
        children.content = element;
      } else if (element.type === Container.Footer) {
        children.footer = element;
      } else {
        children.other!.push(child);
      }
    } else {
      children.other!.push(child);
    }
  });

  return children;
}

function Container(props: ContainerProps) {
  const { children, hasNavBarTop = true, hasFooterBottom = true, className, ...otherViewProps } = props;
  const { navbar, content, footer, other } = useMemo(() => {
    return findContainerChildren(children);
  }, [children]);
  const navBarHeight = getNavBarHeight();
  const hasContentMt = hasNavBarTop;
  const hasContentPb = hasFooterBottom && footer;
  const rect = useNodeRect('taroContainerFooter', [hasContentPb]);
  const themeMode = themeStore.useTracked.themeMode();
  const pageInstance = Taro.getCurrentInstance();
  return (
    <View className={`${className || ''} cover-antmjs-theme-base ${themeMode}`} {...otherViewProps}>
      {navbar ?? <Navbar title={pageInstance.page?.config?.navigationBarTitleText ?? ''} />}
      {content && (
        <View
          id="taroContainerContent"
          className={hasFooterBottom ? 'taro-container__safe-bottom' : ''}
          style={{
            ...(hasContentMt ? { marginTop: navBarHeight } : {}),
            ...(hasContentPb ? { paddingBottom: rect?.height ?? 0 } : {}),
            position: 'relative',
            boxSizing: 'border-box',
          }}
        >
          {content}
        </View>
      )}
      {other}
      {footer}
    </View>
  );
}

Container.Navbar = Navbar;
Container.Content = Content;
Container.Footer = Footer;

export default Container;

export { Navbar, Footer };
