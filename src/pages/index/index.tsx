import Tarologo from "@/components/TaroLogo";
import { useAppDispatch, useAppSelector } from "@/store-hooks";
import { View, Text, Image, Button } from "@tarojs/components";
import "./index.less";
import { addOne, getSingleImgThunk, subtract } from "./slice";

const Index = () => {
  const dispatch = useAppDispatch();
  const num = useAppSelector((state) => state.index.num);
  const img = useAppSelector((state) => state.index.imageUrl);
  return (
    <View className="index flex flex-col mt-100px justify-center items-center">
      <Tarologo />
      <View className="flex items-center mt-30px">
        <Text className="btn" onClick={() => dispatch(subtract())}>
          -
        </Text>
        <Text className="mx-30px ">{num}</Text>
        <Text className="btn" onClick={() => dispatch(addOne())}>
          +
        </Text>
      </View>
      <View className="mt-200px flex flex-col">
        <View className="w-500px shadow-lg flex flex-col items-center justify-center">
          {img ? <Image src={img} className="w-full" mode="widthFix" /> : <Text>点击获取图片</Text>}
        </View>
        <Button className="mt-30px" onClick={() => dispatch(getSingleImgThunk())}>获取图片</Button>
      </View>
    </View>
  );
};

export default Index;
