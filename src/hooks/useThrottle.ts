import { useEffect, useState } from 'react';
import  ThrottleOptions  from './interface/ThrottleOptions';

import useThrottleFn from './useThrottleFn';

function useThrottle<T>(value: T, options?: ThrottleOptions) {
  const [throttled, setThrottled] = useState(value);

  const { run } = useThrottleFn(() => {
    setThrottled(value);
  }, options);

  useEffect(() => {
    run();
  }, [value]);

  return throttled;
}

export default useThrottle;
