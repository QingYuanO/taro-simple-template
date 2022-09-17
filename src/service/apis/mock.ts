import ApiService from '..';

const MOCK_BASE_URL = 'http://127.0.0.1:9527';

export const getMockList = () => {
  return ApiService.get(`${MOCK_BASE_URL}/api/tags`, {
    data: { page: 1, pageSize: 10 },
  });
};
