import { Button } from '@antmjs/vantui';
import { View, Text } from '@tarojs/components';
import { memo } from 'react';
import shallow from 'zustand/shallow';
import create from 'zustand';

interface CountState {
  count: number;
  plus: () => void;
  minus: () => void;
}

export const useCountStore = create<CountState>()((set, get, api) => ({
  count: 0,
  plus: () => set(state => ({ count: state.count + 1 })),
  minus: () => set(state => ({ count: state.count - 1 })),
}));

const Count = () => {
  const { count, plus, minus } = useCountStore(state => state, shallow);

  return (
    <View className="mt-[30px] flex items-center">
      <Button round icon="minus" className="text-btn" onClick={minus} />
      <Text className="mx-[30px] ">{count}</Text>
      <Button round icon="plus" className="text-btn" onClick={plus} />
    </View>
  );
};

export default memo(Count);
