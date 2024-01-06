import ApiService, { CustomResult } from '..';

export const refreshToken = () => {
  return ApiService.get<CustomResult<{ token: string }>>(`/api/refreshToken`, {
    data: {},
    extraConfig: { isHasToken: false, showLoading: false },
  }).then(res => {
    return res?.data;
  });
};
