import { MockList } from '@/mock';
import { createInfiniteQuery } from 'react-query-kit';

import ApiService, { CustomResult } from '..';

type ListData = {
  list: MockList;
  page: number;
  pageSize: number;
  total: number;
  isLastPage: boolean;
};

export const getMockList = (page: number) => {
  return ApiService.get<CustomResult<ListData>>(`/api/list`, {
    data: { page, pageSize: 10 },
  }).then(res => {
    return res.data;
  });
};

export const useMockList = createInfiniteQuery<ListData, void>({
  primaryKey: 'getMockList',
  queryFn: ({ queryKey: [_primaryKey], pageParam = 1 }) => getMockList(pageParam),
  getNextPageParam: lastPage => (lastPage.isLastPage ? undefined : lastPage.page + 1),
});
