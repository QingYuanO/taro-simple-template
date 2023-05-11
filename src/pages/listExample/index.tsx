import { ScrollView, View } from '@tarojs/components';
import { useReachBottom } from '@tarojs/taro';
import { MockList } from '@/mock';
import Container from '@/src/components/Container';
import InfiniteList from '@/src/components/InfiniteList';

import { useMockList } from '@/src/service/apis/mock';

definePageConfig({
  navigationBarTitleText: '测试无限滚动',
});

const ListExample = () => {
  const { data, isFetchingNextPage, isLoading, hasNextPage, fetchNextPage } = useMockList();
  const list = data?.pages.reduce((t, c) => {
    return [...t, ...c.list];
  }, []);
  useReachBottom(() => {
    fetchNextPage();
  });
  if (isLoading) return null;
  return (
    <Container>
      <InfiniteList<MockList[number]>
        listWrapClassName="flex flex-col gap-y-2 pt-4 px-4"
        itemKey="id"
        data={list}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        renderItem={item => {
          return <View className="rounded-md bg-blue-400 p-5 text-white shadow shadow-blue-400">{item.name}</View>;
        }}
      />
      <ScrollView></ScrollView>
    </Container>
  );
};

export default ListExample;
