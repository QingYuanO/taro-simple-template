import AnimeImage from "@/components/AnimeImage";
import Conut from "@/components/Conut";
import Tarologo from "@/components/TaroLogo";
import { View } from "@tarojs/components";
import { IPluginContext } from '@tarojs/service'
import "./index.less";

const Index = () => {
  return (
    <View className="index flex flex-col justify-center items-center py-50px">
      <Tarologo />
      <Conut />
      <AnimeImage />
    </View>
  );
};

export default Index;
