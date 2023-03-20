import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

type QueryOption<R> = Parameters<typeof useQuery<R>>['2'];

interface UseDebounceQueryProps<R, P> {
  key: string;
  params: P;
  debounce: number;
  option: QueryOption<R>;
  request: (p: P) => Promise<R>;
}

export const useDebounceQuery = <R = unknown, P = unknown>(props: UseDebounceQueryProps<R, P>) => {
  const { params, debounce, key, option, request } = props;
  const [newParams, setNewParams] = useState(params);

  useEffect(() => {
    const stringify = obj => JSON.stringify(obj);
    if (stringify(params) !== stringify(newParams)) {
      const timerId = setTimeout(() => setNewParams(params), debounce);
      return () => clearTimeout(timerId);
    }
  }, [params]);

  return useQuery<R>([key, newParams], () => request(newParams), option);
};
