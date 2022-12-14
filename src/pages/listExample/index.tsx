import { View } from '@tarojs/components';
import { getMockList } from '@/service/apis/mock';
import { useLoad } from '@tarojs/taro';
import { useState } from 'react';
import { MockList } from '@/mock';

definePageConfig({
  navigationBarTitleText: '测试无限滚动',
});

const ListExample = () => {
  const [mockList, setMockList] = useState<MockList>([]);

  useLoad(async () => {
    const data = await getMockList(1);
    setMockList(data.list);
  });
  return (
    <View>
      {mockList.map(item => (
        <View key={item.id}>{item.name}</View>
      ))}
    </View>
  );
};

export default ListExample;
