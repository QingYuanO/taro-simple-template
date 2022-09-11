import { useNodeRect } from '@/hooks/useNodeRect';
import { ViewProps, View } from '@tarojs/components';
import React, {
  Children,
  forwardRef,
  Fragment,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { isIPhoneX } from '../../helper';
import { FooterProps, FooterRef } from '../../types';
import './index.less';

export default forwardRef<
  FooterRef | undefined,
  FooterProps & Omit<ViewProps, 'style'>
>(function Footer(
  { children, hasSeat, onFooterRectChange, ...viewProps },
  ref,
) {
  const isIPhone = isIPhoneX();
  const { className, id, ...otherViewProps } = viewProps;
  const formattedChildren = useMemo(() => {
    const single = Children.only(children);
    if (single && React.isValidElement(single)) {
      const addedSafeBottomChildren = React.cloneElement(single, {
        className: `${isIPhone ? 'taro-container__safe-bottom' : ''} ${
          single?.props?.className ?? ''
        }`,
      });
      return addedSafeBottomChildren;
    }
    return children;
  }, []);

  const rect = useNodeRect('taroContainerFooter', [children]);

  useEffect(() => {
    if (onFooterRectChange && rect) {
      onFooterRectChange(rect);
    }
  }, [onFooterRectChange, rect]);

  useImperativeHandle(ref, () => ({
    getFooterRect: () => {
      return rect;
    },
  }));

  return (
    <Fragment>
      <View
        id='taroContainerFooter'
        className={`taro-container__footer-wrap ${className ?? ''}`}
        {...otherViewProps}
      >
        {formattedChildren}
      </View>
      {hasSeat && <View style={{ height: rect?.height ?? 0 }}></View>}
    </Fragment>
  );
});
