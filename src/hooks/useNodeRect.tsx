import Taro, { nextTick } from '@tarojs/taro';
import { useState, useEffect, useRef } from 'react';

export default function useNodeRect(nodeId: string, deps?: any[]) {
  const [rect, setRect] =
    useState<Taro.NodesRef.BoundingClientRectCallbackResult>();
  const selector = useRef(Taro.createSelectorQuery());

  useEffect(() => {
    if (nodeId) {
      nextTick(() => {
        selector.current
          .select(`#${nodeId}`)
          .boundingClientRect((res) => {
            if (res) {
              setRect(res);
            }
          })
          .exec();
      });
    }
  }, [nodeId, ...(deps ?? [])]);

  return rect;
}
