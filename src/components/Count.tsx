import { Button } from '@antmjs/vantui';
import { View, Text } from '@tarojs/components';
import { memo } from 'react';
import shallow from 'zustand/shallow';

import create from 'zustand';

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

export const useBeeStore = create(set => ({
  count: 0,
  plus: () => set(state => ({ count: state.count + 1 })),
  minus: () => set(state => ({ count: state.count - 1 })),
}));

const Count = () => {
  const { count, plus, minus } = useBeeStore(state => ({ count: state.count, plus: state.plus, minus: state.minus }), shallow);

  return (
    <View className="mt-[30px] flex items-center">
      <Button round icon="minus" className="text-btn" onClick={minus} />
      <Text className="mx-[30px] ">{count}</Text>
      <Button round icon="plus" className="text-btn" onClick={plus} />
    </View>
  );
};

export default memo(Count);
