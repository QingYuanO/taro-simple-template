import { useLoad, useReachBottom } from '@tarojs/taro';
import { useState } from 'react';

type SearchType = Record<string, any>;

type ListParams = {
  page: number;
  pageSize: number;
  search?: SearchType;
};

type ListData<D> = {
  list: D[];
  hasNextPage: boolean;
  total: number;
};

type UseInfiniteListParams<D> = {
  fetchListApi: (data: ListParams) => Promise<ListData<D>>;
  id?: string;
  defaultPageSize?: number;
  isAutoInitLoad?: boolean;
  isAutoFetchNext?: boolean;
};

function useInfiniteList<D = unknown>(option: UseInfiniteListParams<D>) {
  const {
    fetchListApi,
    id,
    defaultPageSize = 10,
    isAutoInitLoad,
    isAutoFetchNext,
  } = option;
  const [listParams, setListParams] = useState<ListParams>(() => ({
    page: 1,
    pageSize: defaultPageSize,
  }));
  const [listData, setListData] = useState<ListData<D>>({
    list: [],
    total: 0,
    hasNextPage: true,
  });
  const [isInitLoading, setIsInitLoading] = useState(false);
  const [isFetchNext, setIsFetchNext] = useState(false);

  useLoad(() => {
    if (isAutoInitLoad) {
      initLoadList();
    }
  });

  useReachBottom(() => {
    if (isAutoFetchNext) {
      fetchNextPage();
    }
  });

  const initLoadList = async (externalSearch: SearchType = {}) => {
    if (isInitLoading) return;
    try {
      setIsInitLoading(true);
      const { search } = listParams;
      const realSearch = { ...(search ?? {}), ...externalSearch };
      const data = await fetchListApi({
        page: 1,
        pageSize: defaultPageSize,
        ...realSearch,
      });
      setIsInitLoading(true);
      setListData(data);
      setListParams((state) => ({
        page: state.page + 1,
        pageSize: state.pageSize,
        search: realSearch,
      }));
    } catch (error) {
      setIsInitLoading(true);
      console.log(error);
    }
  };
  const fetchNextPage = async (externalSearch: SearchType = {}) => {
    if (!listData?.hasNextPage || isFetchNext) return;
    try {
      setIsFetchNext(true);
      const { page, pageSize, search } = listParams;
      const realSearch = { ...(search ?? {}), ...externalSearch };
      const data = await fetchListApi({
        page,
        pageSize,
        ...realSearch,
      });
      setIsFetchNext(false);
      setListData((state) => ({
        ...data,
        list: state.list.concat(data.list),
      }));
      setListParams((state) => ({
        page: state.page + 1,
        pageSize: state.pageSize,
        search: realSearch,
      }));
    } catch (error) {
      setIsFetchNext(false);
      console.log(error);
    }
  };

  const updateItem = (data: Partial<D>) => {
    if (!id) {
      throw new Error('id undefine');
    }
    setListData((state) => ({
      ...state,
      list: state.list.map((item) => {
        if (item[id] === data[id]) {
          return { ...item, ...data };
        } else {
          return item;
        }
      }),
    }));
  };

  const delItem = async (deletedId: any) => {
    if (!id) {
      throw new Error('id undefine');
    }
    try {
      const deletedList = listData.list.filter(
        (item) => item[id] !== deletedId,
      );
      if (listData.hasNextPage) {
        const { page, pageSize, search } = listParams;
        const singleData = await fetchListApi({
          pageSize: 1,
          page: page * pageSize + 1,
          ...search,
        });
        setListData({
          ...singleData,
          list: [...deletedList, ...singleData.list],
        });
      } else {
        setListData({
          ...listData,
          list: deletedList,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    listData,
    isFetchNext,
    isInitLoading,
    fetchNextPage,
    initLoadList,
    updateItem,
    delItem,
  };
}

export default useInfiniteList;
