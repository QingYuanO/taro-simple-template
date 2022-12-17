import { View } from '@tarojs/components';
import { getMockList } from '@/service/apis/mock';
import useInfiniteList from '@/hooks/useInfiniteList';
import Container from '@/components/Container';

definePageConfig({
  navigationBarTitleText: '测试无限滚动',
});

const ListExample = () => {
  const { listData, isFetchNext, isInitLoading } = useInfiniteList({
    fetchListApi: async params => {
      const data = await getMockList(params.page);
      return {
        list: data.list,
        hasNextPage: !data.isLastPage,
        total: data.total,
      };
    },
    isAutoFetchNext: true,
    isAutoInitLoad: true,
  });

  return (
    <Container>
      <View className="flex flex-col gap-y-2 p-4">
        {listData.list.map(item => (
          <View className="rounded-md bg-blue-400 p-5 text-white shadow shadow-blue-400" key={item.id}>
            {item.name}
          </View>
        ))}
      </View>
    </Container>
  );
};

export default ListExample;
