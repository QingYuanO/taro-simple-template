import { useEffect } from "react";
import useFirstMountState from "./useFirstMountState";

/**
 * 只根据依赖的deps改变而执行，第一次渲染组件不执行effect
 * @param effect
 * @param deps
 */
const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isFirstMount = useFirstMountState();

  useEffect(() => {
    if (!isFirstMount) {
      return effect();
    }
  }, deps);
};

export default useUpdateEffect;
