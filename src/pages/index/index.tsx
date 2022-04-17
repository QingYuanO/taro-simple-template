import Count from "@/components/Count";
import TaroLogo from "@/components/TaroLogo";
import { usePrefetch } from "@/service/apis/imgApi";
import { toPackageAHomePage } from "@/utils/toRouterPage";
import { Button, View } from "@tarojs/components";
import "./index.less";

definePageConfig({
  navigationBarTitleText: "首页",
  backgroundColor: "#000000", //貌似不起效
});

const Index = () => {
  const prefetchImg = usePrefetch("getSfwWaifu");
  return (
    <View className="index flex flex-col justify-center items-center py-50px">
      <TaroLogo />
      <Count />

      <Button
        type="primary"
        className="mt-50px"
        onClick={() => {
          prefetchImg(null);
          toPackageAHomePage();
        }}
      >
        toPackageAHomePage
      </Button>
    </View>
  );
};

export default Index;
