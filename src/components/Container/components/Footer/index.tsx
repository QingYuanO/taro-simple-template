import useNodeRect from '@/hooks/useNodeRect';
import { ViewProps, View } from '@tarojs/components';
import { useWhyDidYouUpdate } from 'ahooks';
import React, {
  Children,
  forwardRef,
  Fragment,
  memo,
  useEffect,
  useImperativeHandle,
  useMemo,
} from 'react';
import { isIPhoneX } from '../../helper';
import { FooterProps, FooterRef } from '../../types';
import './index.less';

export default memo(
  forwardRef<FooterRef | undefined, FooterProps & Omit<ViewProps, 'style'>>(
    function Footer(props, ref) {
      useWhyDidYouUpdate('Footer', { ...props });
      const { children, hasSeat, onFooterRectChange, ...viewProps } = props;
      const { className, id, ...otherViewProps } = viewProps;
      const isIPhone = isIPhoneX();
      // const formattedChildren = useMemo(() => {
      //   const single = Children.only(children);
      //   if (single && React.isValidElement(single)) {
      //     const addedSafeBottomChildren = React.cloneElement(single, {
      //       className: `${isIPhone ? 'taro-container__safe-bottom' : ''} ${
      //         single?.props?.className ?? ''
      //       }`,
      //     });
      //     return addedSafeBottomChildren;
      //   }
      //   return children;
      // }, [children, isIPhone]);

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
            className={`taro-container__footer-wrap  ${className ?? ''} ${
              isIPhone ? 'taro-container__safe-bottom' : ''
            }`}
            {...otherViewProps}
          >
            {children}
          </View>
          {hasSeat && <View style={{ height: rect?.height ?? 0 }}></View>}
        </Fragment>
      );
    },
  ),
);
