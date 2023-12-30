import { useState } from 'react';
import { ScrollView, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { MockList } from '@/mock';
import Container from '@/src/components/Container';
import { getNavBarHeight } from '@/src/components/Container/helper';
import InfiniteList from '@/src/components/InfiniteList';
import Button from '@/src/components/ui/Button';

import { useMockList } from '@/src/service/apis/mock';

definePageConfig({
  navigationBarTitleText: 'ScrollViewList',
  navigationStyle: 'custom',
});

const height = Taro.getSystemInfoSync().screenHeight;

const ScrollViewList = () => {
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useMockList();
  const list = data?.pages.reduce(
    (t, c) => {
      return [...t, ...c.list];
    },
    [] as MockList[number][]
  );
  const [footerHeight, setFooterHeight] = useState(0);
  const tHeight = getNavBarHeight();

  return (
    <Container>
      <Container.Navbar title="ScrollViewList" hasSeat />
      <ScrollView
        className=" overflow-auto"
        style={{ height: height - tHeight - (footerHeight ?? 0) }}
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
      <Container.Footer
        className="bg-background px-4 py-2 safe-b flex-center"
        onFooterRectChange={rect => setFooterHeight(rect?.height ?? 0)}
      >
        <Button round block>
          确认
        </Button>
      </Container.Footer>
    </Container>
  );
};

export default ScrollViewList;
