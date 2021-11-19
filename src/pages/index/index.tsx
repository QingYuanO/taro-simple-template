import Tarologo from "@/components/TaroLogo";
import { useAppDispatch, useAppSelector } from "@/store-hooks";
import { View, Text } from "@tarojs/components";
import './index.less'
import { addOne, subtract } from "./slice";

const Index = () => {
  const dispatch = useAppDispatch()
  const num = useAppSelector((state) => state.index.num);
  return (
    <View className="index flex flex-col mt-100rpx justify-center items-center">
      <Tarologo />
      <View className="flex mt-30rpx">
        <Text className="btn" onClick={() => dispatch(subtract())}>-</Text>
        <Text className="mx-30rpx">{num}</Text>
        <Text className="btn" onClick={() => dispatch(addOne())}>+</Text>
      </View>
    </View>
  );
};

export default Index;
