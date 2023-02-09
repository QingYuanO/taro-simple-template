
import { View, Text } from '@tarojs/components';
import { memo } from 'react';
import { createStore } from '@udecode/zustood';
import getStorage from '@/utils/getStorage';
import { Button } from '@nutui/nutui-react-taro';

const log = config => (set, get, api) =>
  config(
    (...args) => {
      console.log('  applying', args);
      set(...args);
      console.log('  new state', get());
    },
    get,
    api
  );

const countStore = createStore('count')<{ count: number }>(
  {
    count: 0,
  },
  {
    devtools: {
      enabled: true,
    },
    persist: {
      enabled: true,
      name: 'count',
      getStorage,
      onRehydrateStorage() {
        return (state, error) => {
          // console.log(state);
        };
      },
    },
    middlewares: [log],
  }
);
countStore.store.subscribe((state, preState) => {
  console.log(state);
  console.log(preState);
});
const Count = () => {
  const count = countStore.useTracked.count();
  return (
    <View className="mt-[30px] flex items-center">
      <Button

        icon="minus"
        className="text-btn"
        onClick={() => {
          countStore.set.count(count - 1);
        }}
      />
      <Text className="mx-[30px] ">{count}</Text>
      <Button

        icon="plus"
        className="text-btn"
        onClick={() => {
          countStore.set.count(count + 1);
        }}
      />
    </View>
  );
};

export default memo(Count);
