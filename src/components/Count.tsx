import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { View, Text } from "@tarojs/components";
import { memo } from "react";
import { addOne, subtract } from "../pages/index/slice";

const Count = () => {
  const dispatch = useAppDispatch();
  const num = useAppSelector((state) => state.index.num);
  return (
    <View className="flex items-center mt-30px">
      <Text className="btn" onClick={() => dispatch(subtract())}>
        -
      </Text>
      <Text className="mx-30px ">{num}</Text>
      <Text className="btn" onClick={() => dispatch(addOne())}>
        +
      </Text>
    </View>
  );
};

export default memo(Count);
