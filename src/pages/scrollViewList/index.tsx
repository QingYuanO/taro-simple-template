import { ScrollView, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { MockList } from '@/mock';
import Container from '@/src/components/Container';
import { getNavBarHeight } from '@/src/components/Container/helper';
import InfiniteList from '@/src/components/InfiniteList';
import Button from '@/src/components/ui/Button';

import { useNodeRect } from '@/src/hooks';
import { useMockList } from '@/src/service/apis/mock';

definePageConfig({
  navigationBarTitleText: 'ScrollViewList',
  navigationStyle: 'custom',
});

const height = Taro.getSystemInfoSync().screenHeight;

const ScrollViewList = () => {
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useMockList();
  const list = data?.pages.reduce((t, c) => {
    return [...t, ...c.list];
  }, []);

  const tHeight = getNavBarHeight();
  const bHeight = useNodeRect('taroContainerFooter');

  return (
    <Container hasFooterBottom={false} hasNavBarTop={false}>
      <Container.Navbar title="ScrollViewList" hasSeat />
      <ScrollView
        className=" overflow-auto"
        style={{ height: height - tHeight - (bHeight?.height ?? 0) }}
        scrollY
        enhanced
        lowerThreshold={150}
        showScrollbar={false}
        refresherEnabled
        onScrollToLower={() => {
          fetchNextPage();
        }}
      >
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
      </ScrollView>
      <Container.Footer className="px-4 flex-center">
        <Button round block>
          确认
        </Button>
      </Container.Footer>
    </Container>
  );
};

export default ScrollViewList;
