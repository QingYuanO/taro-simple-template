import Taro, { nextTick, useReady, useUnload } from '@tarojs/taro';
import { useUpdateEffect } from 'ahooks';
import { useState, useRef, useMemo, useCallback } from 'react';
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
  const observer = useRef(
    new IntersectionObserver(
      function (entries) {
        const observeNode = entries[entries.length - 1];
        console.log(observeNode);

        setShow(
          observeNode.intersectionRect.height > 0 ||
            observeNode.boundingClientRect.top >= safeTop,
        );
        setRect(observeNode.boundingClientRect);
      },
      {
        rootMargin: `-${safeTop}px 0px 0px `,
        // threshold: [0,0.5, 1],
      },
    ),
  );
  const generateObserver = useCallback(() => {
    const node = document.querySelector(`#${nodeId}`);
    if (node) {
      nextTick(() => {
        observer.current.observe(node);
      });
    }
  }, [nodeId]);
  useReady(() => {
    generateObserver();
  });
  useUpdateEffect(() => {
    generateObserver();
  }, [generateObserver]);

  useUnload(() => {
    observer.current.disconnect();
  });

  return { show, rect };
}
