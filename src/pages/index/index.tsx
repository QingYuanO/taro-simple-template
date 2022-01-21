import AnimeImage from "@/components/AnimeImage";
import Count from "@/components/Count";
import TaroLogo from "@/components/TaroLogo";
import { toPackageAHomePage } from "@/utils/toRouterPage";
import { Button, View } from "@tarojs/components";
import "./index.less";

definePageConfig({
  navigationBarTitleText: "首页",
  backgroundColor: "#000000", //貌似不起效
});

const Index = () => {
  return (
    <View className="index flex flex-col justify-center items-center py-50px">
      <TaroLogo />
      <Count />
      <AnimeImage />
      <Button
        type="primary"
        className="mt-50px"
        onClick={() => toPackageAHomePage()}
      >
        toPackageAHomePage
      </Button>
    </View>
  );
};

export default Index;
