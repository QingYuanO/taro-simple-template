import { createInfiniteQuery } from 'react-query-kit';
import { MockList } from '@/mock';

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
    extraConfig: { isHasToken: true, showLoading: false },
  }).then(res => {
    return res?.data;
  });
};

export const useMockList = createInfiniteQuery({
  queryKey: ['getMockList'],
  fetcher: (_, { pageParam }) => {
    return getMockList(pageParam);
  },
  getNextPageParam: lastPage => (lastPage.isLastPage ? undefined : lastPage.page + 1),
  initialPageParam: 1,
});
