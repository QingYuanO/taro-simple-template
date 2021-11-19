import { useRef } from "react";

export type noop = (...args: any[]) => any;

/**
 * 持久化 function 的 Hook。
 * @param fn
 * @returns
 */
function usePersistFn<T extends noop>(fn: T) {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;

  const persistFn = useRef<T>();
  if (!persistFn.current) {
    persistFn.current = function (...args) {
      return fnRef.current!.apply(this, args);
    } as T;
  }

  return persistFn.current!;
}

export default usePersistFn;
