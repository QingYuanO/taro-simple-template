import useNodeRect from '@/hooks/useNodeRect';
import { ViewProps, View } from '@tarojs/components';
import { useWhyDidYouUpdate } from 'ahooks';
import { forwardRef, Fragment, memo, useEffect, useImperativeHandle } from 'react';
import { isIPhoneX } from '../../helper';
import { FooterProps, FooterRef } from '../../types';
import './index.less';

export default memo(
  forwardRef<FooterRef | undefined, FooterProps & Omit<ViewProps, 'style'>>(function Footer(props, ref) {
    useWhyDidYouUpdate('Footer', { ...props });
    const { children, hasSeat, hasSafe = true, onFooterRectChange, ...viewProps } = props;
    const { className, id, ...otherViewProps } = viewProps;
    const isIPhone = isIPhoneX();
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
          id="taroContainerFooter"
          className={`taro-container__footer-wrap  ${className ?? ''} ${isIPhone && hasSafe ? 'taro-container__safe-bottom' : ''}`}
          {...otherViewProps}
        >
          {children}
        </View>
        {hasSeat && <View style={{ height: rect?.height ?? 0 }}></View>}
      </Fragment>
    );
  })
);
