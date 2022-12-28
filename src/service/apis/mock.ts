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
  }).then(res => {
    return res.data;
  });
};
