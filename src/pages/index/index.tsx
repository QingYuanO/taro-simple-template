import Count from "@/components/Count";
import TaroLogo from "@/components/TaroLogo";
import { getSingleImg } from "@/service/apis/img";
import { toPackageAHomePage } from "@/utils/toRouterPage";
import { Button, View } from "@tarojs/components";
import { useQueryClient } from "react-query";
import "./index.less";

definePageConfig({
  navigationBarTitleText: "首页",
});

const Index = () => {
  const queryClient = useQueryClient();

  return (
    <View className="index py-[50px] flex flex-col items-center justify-center">
      <TaroLogo />
      <Count />

      <Button
        type="primary"
        className="mt-[50px]"
        onClick={() => {
          // queryClient.prefetchQuery(["getSingleImg"],getSingleImg);
          toPackageAHomePage();
        }}
      >
        toPackageAHomePage
      </Button>
    </View>
  );
};

export default Index;
