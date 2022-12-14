import { MockList } from '@/mock';
import ApiService, { CustomResult } from '..';

const MOCK_BASE_URL = process.env.TARO_ENV === 'h5' ? 'http://127.0.0.1:9527' : 'http://127.0.0.1:9528';

type ListData = {
  list: MockList;
  page: number;
  pageSize: number;
  total: number;
  isLastPage: boolean;
};

export const getMockList = (page: number) => {
  return ApiService.get<CustomResult<ListData>>(`${MOCK_BASE_URL}/api/list`, {
    data: { page, pageSize: 10 },
  }).then(res => {
    return res.data;
  });
};
