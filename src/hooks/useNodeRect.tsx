import Taro, { nextTick } from '@tarojs/taro';
import { useState, useMemo, useCallback, useEffect } from 'react';

export default function useNodeRect(nodeId: string, deps?: any[]) {
  const [rect, setRect] =
    useState<Taro.NodesRef.BoundingClientRectCallbackResult>();
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
    getRect();
  }, [getRect, ...(deps ?? [])]);

  return rect;
}
