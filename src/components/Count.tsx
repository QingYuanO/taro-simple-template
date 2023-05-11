import { memo } from 'react';
import { Text, View } from '@tarojs/components';
import styled from '@slicknode/stylemapper';
import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';

import Button from './ui/Button';

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
        className="circular-12"
        type="plain"
        round
        onClick={() => {
          decrease(1);
        }}
      >
        -
      </Button>
      <Text className="mx-[30px] ">{count}</Text>
      <Button
        className="circular-12"
        type="plain"
        round
        onClick={() => {
          increase(1);
        }}
      >
        +
      </Button>
    </View>
  );
};

export default memo(Count);
