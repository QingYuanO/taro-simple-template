import { View } from '@tarojs/components';
import { memo, useEffect, useMemo, useState } from 'react';
import useNodeRect from '@/hooks/useNodeRect';
import { useWhyDidYouUpdate } from 'ahooks';
import './index.less';
import { findContainerChildren, getNavBarHeight } from './helper';
import { Content, Footer, Navbar } from './components';
import { ContainerProps } from './types';

function Container(props: ContainerProps) {
  const {
    children,
    hasNavBarTop = true,
    hasFooterBottom = true,
    ...otherViewProps
  } = props;
  // useWhyDidYouUpdate('Container', { ...props });
  const { navbar, content, footer, other } = useMemo(() => {
    return findContainerChildren(children);
  }, [children]);
  const navBarHeight = getNavBarHeight();
  const hasContentMt = hasNavBarTop && navbar;
  const hasContentPb = hasFooterBottom && footer;
  const rect = useNodeRect('taroContainerFooter', [hasContentPb]);

  return (
    <View {...otherViewProps}>
      {navbar}
      {content && (
        <View
          id='taroContainerContent'
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

export default Container ;

export { Navbar, Footer };
