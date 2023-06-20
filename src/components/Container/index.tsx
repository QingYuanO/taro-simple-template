import { Children, isValidElement, ReactElement, ReactNode, useMemo } from 'react';
import { View } from '@tarojs/components';

import useNodeRect from '@/src/hooks/useNodeRect';
import useThemeStore from '@/src/stores/theme';

import { Footer, Navbar } from './components';
import { getNavBarHeight } from './helper';
import { ContainerChildren, ContainerProps } from './types';

function findContainerChildren(node?: ReactNode): ContainerChildren {
  const children: ContainerChildren = {
    navbar: undefined,
    footer: undefined,
    other: [],
  };

  Children.forEach(node, (child: ReactNode) => {
    if (isValidElement(child)) {
      const element = child as ReactElement;
      if (element.type === Container.Navbar) {
        children.navbar = element;
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
  const { children, hasNavBarTop = true, hasFooterBottom = true, hasSafeBottom, className, ...otherViewProps } = props;
  const { navbar, footer, other } = useMemo(() => {
    return findContainerChildren(children);
  }, [children]);
  const navBarHeight = getNavBarHeight();
  const hasContentMt = hasNavBarTop && navbar;
  const hasContentPb = hasFooterBottom && footer;
  const rect = useNodeRect('taroContainerFooter', [hasContentPb]);
  const themeMode = useThemeStore(state => state.themeMode);
  const isWrapContainer = !!navbar || !!footer;
  const safeBottomClass = hasSafeBottom ? 'safe-b' : '';
  return (
    <View
      className={`cover-nutui-theme-base ${process.env.TARO_ENV} ${themeMode} ${
        !isWrapContainer ? `${className || ''} ${safeBottomClass}` : ''
      }`}
      {...otherViewProps}
    >
      {navbar}
      {isWrapContainer ? (
        <View
          id="taroContainerContent"
          className={`${className}  ${safeBottomClass}`}
          style={{
            ...(hasContentMt ? { marginTop: navBarHeight } : {}),
            ...(hasContentPb ? { paddingBottom: rect?.height ?? 0 } : {}),
            position: 'relative',
            boxSizing: 'border-box',
          }}
        >
          {other}
        </View>
      ) : (
        other
      )}
      {footer}
    </View>
  );
}

Container.Navbar = Navbar;
Container.Footer = Footer;

export default Container;

export { Navbar, Footer };
