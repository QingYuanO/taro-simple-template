import { forwardRef, Fragment, memo, useEffect, useImperativeHandle } from 'react';
import { View, ViewProps } from '@tarojs/components';

import useNodeRect from '@/src/hooks/useNodeRect';

import { FooterProps, FooterRef } from '../../types';

export default memo(
  forwardRef<FooterRef | undefined, FooterProps & Omit<ViewProps, 'style'>>(function Footer(props, ref) {
    const { children, hasSeat, onFooterRectChange, ...viewProps } = props;
    const { className, id, ...otherViewProps } = viewProps;
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
        <View id="taroContainerFooter" className={` fixed inset-x-0 bottom-0 z-[100] box-border  ${className ?? ''}`} {...otherViewProps}>
          {children}
        </View>
        {hasSeat && <View style={{ height: rect?.height ?? 0 }}></View>}
      </Fragment>
    );
  })
);
