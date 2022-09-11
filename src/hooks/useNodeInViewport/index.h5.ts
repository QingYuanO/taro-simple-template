import Taro, { nextTick, useUnload } from '@tarojs/taro';
import { useEffect, useState, useRef } from 'react';
import { getSafeTop } from './getSafeTop';

/**
 * 观察一个元素是否从顶部移出可视界面
 * @param nodeId 被观察的元素
 * @returns boolean
 */
export default function useNodeInViewport(nodeId: string) {
  const [show, setShow] = useState(true);
  const [rect, setRect] =
    useState<Taro.IntersectionObserver.BoundingClientRectResult>();
  const safeTop = getSafeTop();
  const observer = useRef(
    new IntersectionObserver(
      function (entries) {
        const observeNode = entries[entries.length - 1];
        setShow(observeNode.isIntersecting);
        setRect(observeNode.boundingClientRect);
      },
      {
        rootMargin: `-${safeTop}px 0px 0px `,
      },
    ),
  );

  useEffect(() => {
    const node = document.querySelector(`#${nodeId}`);
    if (node) {
      nextTick(() => {
        observer.current.observe(node);
      });
    }
  }, [nodeId, safeTop]);

  useUnload(() => {
    observer.current.disconnect();
  });

  return { show, rect };
}
