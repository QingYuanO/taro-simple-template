import Taro, { nextTick, useReady, useUnload } from '@tarojs/taro';
import { useMemo, useCallback, useEffect, useState } from 'react';
import { getSafeTop } from './getSafeTop';

/**
 * 观察一个元素是否从顶部移出可视界面
 * @param nodeId 被观察的元素的id
 */
export default function useNodeDisappearInTop(nodeId: string) {
  const [show, setShow] = useState(true);
  const [rect, setRect] =
    useState<Taro.IntersectionObserver.BoundingClientRectResult>();
  const safeTop = useMemo(() => {
    return getSafeTop();
  }, []);
  const observer = useMemo(() => {
    return Taro.createIntersectionObserver(this);
  }, []);
  const generateObserver = useCallback(() => {
    if (nodeId) {
      nextTick(() => {
        observer
          .relativeToViewport({
            top: -safeTop,
          })
          .observe(`#${nodeId}`, (res) => {
            const { boundingClientRect, intersectionRatio } = res;
            setRect(boundingClientRect);
            const isHide =
              boundingClientRect.top <= safeTop && intersectionRatio === 0;
            setShow(!isHide);
          });
      });
    }
  }, [observer, nodeId, safeTop]);

  useEffect(() => {
    generateObserver();
  }, [generateObserver]);

  useUnload(() => {
    observer.disconnect();
  });

  return { show, rect };
}
