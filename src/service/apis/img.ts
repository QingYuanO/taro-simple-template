import { createQuery } from 'react-query-kit';

import ApiService from '..';

export const getSingleImg = () => {
  return ApiService.get<{ url: string }>('https://api.waifu.pics/sfw/waifu', {
    extraConfig: { showLoading: false },
    baseUrl: '',
  });
};

export const useSingleImg = createQuery({
  queryKey: ['getSingleImg'],
  fetcher: () => getSingleImg(),
});
