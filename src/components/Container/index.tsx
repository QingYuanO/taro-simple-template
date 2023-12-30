import { Children, isValidElement, ReactElement, ReactNode, useMemo } from 'react';
import { View } from '@tarojs/components';
import useThemeStore from '@/src/stores/theme';

import useNodeRect from '@/src/hooks/useNodeRect';

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
  const { children, safe, className, ...otherViewProps } = props;
  const { navbar, footer, other } = useMemo(() => {
    return findContainerChildren(children);
  }, [children]);

  const themeMode = useThemeStore(state => state.themeMode);

  const navBarHeight = getNavBarHeight();

  const isNavbar = navbar && !navbar.props.hasSeat;
  const isFooter = footer && !footer.props.hasSeat;

  const isSafeTop = safe?.includes('top') || isNavbar;
  const isSafeBottom = safe?.includes('bottom') || isFooter;

  const isWrapContainer = isNavbar || isFooter;

  const rect = useNodeRect('taroContainerFooter', [isSafeBottom]);

  return (
    <View
      className={`cover-nutui-theme-base ${
        process.env.TARO_ENV
      } flex min-h-[100vh] flex-col overflow-y-auto bg-background text-foreground ${themeMode} ${
        !isWrapContainer ? `${className || ''}` : ''
      }`}
      {...otherViewProps}
    >
      {isWrapContainer ? (
        <>
          {navbar}
          <View
            id="taroContainerContent"
            className={`${className}`}
            style={{
              ...(isSafeTop ? { marginTop: navBarHeight } : {}),
              ...(isSafeBottom ? { paddingBottom: rect?.height ?? 0 } : {}),
              position: 'relative',
              boxSizing: 'border-box',
            }}
          >
            {other}
          </View>
          {footer}
        </>
      ) : (
        other
      )}
    </View>
  );
}

Container.Navbar = Navbar;
Container.Footer = Footer;

export default Container;

export { Navbar, Footer };
