import AnimeImage from "@/components/AnimeImage";
import Conut from "@/components/Conut";
import Tarologo from "@/components/TaroLogo";
import { toPackageAHomePage } from "@/utils/toRouterPage";
import { Button, View } from "@tarojs/components";
import "./index.less";

definePageConfig({
  navigationBarTitleText: "首页",
});

const Index = () => {
  return (
    <View className="index flex flex-col justify-center items-center py-50px">
      <Tarologo />
      <Conut />
      <AnimeImage />
      <Button type="primary" className="mt-50px" onClick={() => toPackageAHomePage()}>
        toPackageAHomePage
      </Button>
    </View>
  );
};

export default Index;
