import { View, Text } from '@tarojs/components';
import { atom, useAtom } from 'jotai';
import { memo } from 'react';

const countAtom = atom(0);

const Count = () => {
  const [count, setCount] = useAtom(countAtom);
  return (
    <View className="mt-[30px] flex items-center">
      <Text className="text-btn " onClick={() => setCount(count - 1)}>
        -
      </Text>
      <Text className="mx-[30px] ">{count}</Text>
      <Text className="text-btn " onClick={() => setCount(count + 1)}>
        +
      </Text>
    </View>
  );
};

export default memo(Count);
