import { ViewProps, View } from "@tarojs/components";
import React, {
  Children,
  forwardRef,
  Fragment,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { getFooterRect, isIPhoneX } from "../../helper";
import { FooterProps, FooterRef } from "../../types";
import "./index.less";

export default forwardRef<
  FooterRef | undefined,
  FooterProps & Omit<ViewProps, "style">
>(function Footer(
  { children, hasSeat, onFooterRenderAfter, ...viewProps },
  ref
) {
  const isIPhone = isIPhoneX();
  const { className, id, ...otherViewProps } = viewProps;
  const [nodeHeight, setNodeHeight] = useState(0);

  useEffect(() => {
    getFooterRect((rect) => setNodeHeight(rect.height));
  }, []);

  useEffect(() => {
    getFooterRect(onFooterRenderAfter);
  }, [onFooterRenderAfter]);

  useImperativeHandle(ref, () => ({
    getFooterRect,
  }));

  const formattedChildren = useMemo(() => {
    const single = Children.only(children);
    if (single && React.isValidElement(single)) {
      const addedSafeBottomChildren = React.cloneElement(single, {
        className: `${isIPhone ? "taro-container__safe-bottom" : ""} ${
          single?.props?.className ?? ""
        }`,
      });
      return addedSafeBottomChildren;
    }
    return children;
  }, [children, isIPhone]);

  return (
    <Fragment>
      <View
        id="taroContainerFooter"
        className={`taro-container__footer-wrap ${className ?? ''}`}
        {...otherViewProps}
      >
        {formattedChildren}
      </View>
      {hasSeat && <View style={{ height: nodeHeight }}></View>}
    </Fragment>
  );
});
