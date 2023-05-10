import ApiService, { CustomResult } from '..';

export const refreshToken = () => {
  return ApiService.get<CustomResult<{ token: string }>>(`/api/refreshToken`, {
    data: {},
    extraConfig: { hasToken: false, showLoading: false },
  }).then(res => {
    return res?.data;
  });
};
