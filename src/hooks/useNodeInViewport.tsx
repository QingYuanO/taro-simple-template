import Taro, { nextTick, useReady, useUnload } from '@tarojs/taro';
import { useMemo, useCallback, useEffect, useState, useRef } from 'react';
import { getNavBarHeight } from '../components/Container/helper';

/**
 * 观察一个元素是否从顶部移出可视界面
 * @param nodeId 被观察的元素
 * @returns boolean
 */
export default function useNodeInViewport(nodeId: string) {
  const [show, setShow] = useState(true);
  const [rect, setRect] =
    useState<Taro.IntersectionObserver.BoundingClientRectResult>();
  const firstRender = useRef(true);
  const observer = useMemo(() => {
    return Taro.createIntersectionObserver(this);
  }, []);
  const navBarHeight = getNavBarHeight();
  const generateObserver = useCallback(() => {
    if (nodeId) {
      nextTick(() => {
        observer
          .relativeToViewport({
            top: -navBarHeight,
          })
          .observe(`#${nodeId}`, (res) => {
            const { boundingClientRect, intersectionRatio } = res;
            setRect(boundingClientRect);
            const isHide =
              boundingClientRect.top < navBarHeight && intersectionRatio === 0;
            setShow(!isHide);
          });
      });
    }
  }, [observer, navBarHeight, nodeId]);

  useEffect(() => {
    if (!firstRender.current) {
      generateObserver();
    }
    firstRender.current = false;
  }, [generateObserver]);

  useReady(() => {
    generateObserver();
  });
  useUnload(() => {
    observer.disconnect();
  });

  return { show, rect };
}
