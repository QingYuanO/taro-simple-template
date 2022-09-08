import { View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import './index.less';
import {
  findContainerChildren,
  getFooterRect,
  getNavBarHeight,
} from './helper';
import { Content, Footer, Navbar } from './components';
import { ContainerProps } from './types';

function Container({
  children,
  hasNavBarTop = true,
  hasFooterBottom = true,
  ...otherViewProps
}: ContainerProps) {
  const { navbar, content, footer, other } = findContainerChildren(children);
  const [footerHeight, setFooterHeight] = useState(0);
  const navBarHeight = getNavBarHeight();
  const hasContentMt = hasNavBarTop && navbar;
  const hasContentPb = hasFooterBottom && footer;
  useEffect(() => {
    if (hasContentPb) {
      getFooterRect((rect) => setFooterHeight(rect?.height));
    }
  }, [hasContentPb]);

  return (
    <View {...otherViewProps}>
      {navbar}
      {content && (
        <View
          id='taroContainerContent'
          className={hasFooterBottom ? 'taro-container__safe-bottom' : ''}
          style={{
            ...(hasContentMt ? { marginTop: navBarHeight } : {}),
            ...(hasContentPb ? { paddingBottom: footerHeight } : {}),
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
