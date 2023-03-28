import { memo } from 'react';
import { Text, View } from '@tarojs/components';
import { Button } from '@nutui/nutui-react-taro';
import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';

const countStore = create(
  combine({ count: 0 }, set => ({
    increase: (by: number) => set(state => ({ count: state.count + by })),
    decrease: (by: number) => set(state => ({ count: state.count - by })),
  }))
);

const useCountStore = createSelectorFunctions(countStore);

const Count = () => {
  const count = useCountStore.use.count();
  const increase = useCountStore.use.increase();
  const decrease = useCountStore.use.decrease();

  return (
    <View className="mt-[30px] flex items-center">
      <Button
        icon="minus"
        className="text-btn"
        onClick={() => {
          decrease(1);
        }}
      />
      <Text className="mx-[30px] ">{count}</Text>
      <Button
        icon="plus"
        className="text-btn"
        onClick={() => {
          increase(1);
        }}
      />
    </View>
  );
};

export default memo(Count);
