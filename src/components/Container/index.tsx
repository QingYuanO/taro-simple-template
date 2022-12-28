import { View } from '@tarojs/components';
import { Children, isValidElement, ReactElement, ReactNode, useMemo } from 'react';
import useNodeRect from '@/hooks/useNodeRect';
import themeStore from '@/utils/theme';
import './index.less';
import { getNavBarHeight } from './helper';
import { Footer, Navbar } from './components';
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
  const { children, hasNavBarTop = true, hasFooterBottom = true, className, ...otherViewProps } = props;
  const { navbar, footer, other } = useMemo(() => {
    return findContainerChildren(children);
  }, [children]);
  const navBarHeight = getNavBarHeight();
  const hasContentMt = hasNavBarTop && navbar;
  const hasContentPb = hasFooterBottom && footer;
  const rect = useNodeRect('taroContainerFooter', [hasContentPb]);
  const themeMode = themeStore.useTracked.themeMode();
  const isWrapContainer = !!navbar || !!footer;
  return (
    <View
      className={`cover-antmjs-theme-base ${themeMode} ${!isWrapContainer ? `${className || ''} taro-container__safe-bottom` : ''}`}
      {...otherViewProps}
    >
      {navbar}
      {isWrapContainer ? (
        <View
          id="taroContainerContent"
          className={`${className}`}
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
