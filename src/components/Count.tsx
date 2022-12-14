import { Button } from '@antmjs/vantui';
import { View, Text } from '@tarojs/components';
import { atom, useAtom } from 'jotai';
import { memo } from 'react';

const countAtom = atom(0);

const Count = () => {
  const [count, setCount] = useAtom(countAtom);
  return (
    <View className="mt-[30px] flex items-center">
      <Button round icon="minus" className="text-btn" onClick={() => setCount(count - 1)} />
      <Text className="mx-[30px] ">{count}</Text>
      <Button round icon="plus" className="text-btn" onClick={() => setCount(count + 1)} />
    </View>
  );
};

export default memo(Count);
