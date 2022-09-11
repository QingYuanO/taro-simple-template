import { getNavBarHeight } from '@/components/Container/helper';
import Taro, { getCurrentInstance, nextTick, useUnload } from '@tarojs/taro';
import { useMemo, useCallback, useEffect, useState } from 'react';

/**
 * 观察一个元素是否从顶部移出可视界面
 * @param nodeId 被观察的元素
 * @returns boolean
 */
export default function useNodeInViewport(nodeId: string) {
  const realSafeTop = useMemo(() => {
    const { app, page } = getCurrentInstance();
    const isCustomNavigation =
      //@ts-ignore
      app?.config?.window?.navigationStyle === 'custom' ||
      page?.config?.navigationStyle === 'custom';

    return isCustomNavigation ? navBarHeight : 0;
  }, []);

  const [show, setShow] = useState(true);
  const [rect, setRect] =
    useState<Taro.IntersectionObserver.BoundingClientRectResult>();
  const observer = useMemo(() => {
    return Taro.createIntersectionObserver(this);
  }, []);
  const generateObserver = useCallback(() => {
    if (nodeId) {
      nextTick(() => {
        observer
          .relativeToViewport({
            top: -realSafeTop,
          })
          .observe(`#${nodeId}`, (res) => {
            const { boundingClientRect, intersectionRatio } = res;
            setRect(boundingClientRect);
            const isHide =
              boundingClientRect.top <= realSafeTop && intersectionRatio === 0;
            setShow(!isHide);
          });
      });
    }
  }, [observer, nodeId, realSafeTop]);

  useEffect(() => {
    generateObserver();
  }, [generateObserver]);

  useUnload(() => {
    observer.disconnect();
  });

  return { show, rect };
}

const navBarHeight = getNavBarHeight();
