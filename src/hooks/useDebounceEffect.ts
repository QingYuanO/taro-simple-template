import { useEffect, useState } from 'react';
import type { DependencyList, EffectCallback } from 'react';
import DebounceOptions from './interface/DebounceOptions';
import useDebounceFn from './useDebounceFn';
import useUnmount from './useUnmount';
import useUpdateEffect from './useUpdateEffect';

function useDebounceEffect(
  effect: EffectCallback,
  deps?: DependencyList,
  options?: DebounceOptions,
) {
  const [flag, setFlag] = useState({});

  const { run, cancel } = useDebounceFn(() => {
    setFlag({});
  }, options);

  useEffect(() => {
    return run();
  }, deps);

  useUnmount(cancel);

  useUpdateEffect(effect, [flag]);
}

export default useDebounceEffect;
