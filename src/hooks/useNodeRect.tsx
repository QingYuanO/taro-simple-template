import Taro, { nextTick, useReady } from '@tarojs/taro';
import { useState, useRef, useMemo, useCallback, useEffect } from 'react';

export function useNodeRect(nodeId: string, deps?: any[]) {
  const [rect, setRect] =
    useState<Taro.NodesRef.BoundingClientRectCallbackResult>();
  const firstRender = useRef(true);
  const selector = useMemo(() => {
    return Taro.createSelectorQuery();
  }, []);
  const getRect = useCallback(() => {
    if (nodeId) {
      nextTick(() => {
        selector
          .select(`#${nodeId}`)
          .boundingClientRect((res) => {
            if (res) {
              setRect(res);
            }
          })
          .exec();
      });
    }
  }, [selector, nodeId]);

  useEffect(() => {
    if (!firstRender.current) {
      getRect();
    }
    firstRender.current = false;
  }, [getRect, ...(deps ?? [])]);

  useReady(() => {
    getRect();
  });

  return rect;
}
