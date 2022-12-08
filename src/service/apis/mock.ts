import ApiService from '..';

const MOCK_BASE_URL = process.env.TARO_ENV === 'h5' ? 'http://127.0.0.1:9527' : 'http://127.0.0.1:9528';

export const getMockList = () => {
  return ApiService.get(`${MOCK_BASE_URL}/api/tags`, {
    data: { page: 1, pageSize: 10 },
  });
};
