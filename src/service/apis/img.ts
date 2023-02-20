import ApiService from '..';

export const getSingleImg = () => {
  return ApiService.get<{ url: string }>('https://api.waifu.pics/sfw/waifu', {
    extraConfig: { showLoading: false },
    baseUrl: '',
  });
};
