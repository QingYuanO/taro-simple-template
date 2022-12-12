import Count from '@/components/Count';
import TaroLogo from '@/components/TaroLogo';
import useNodeRect from '@/hooks/useNodeRect';
import { getMockList } from '@/service/apis/mock';
import { toContainerPage, toPackageAHomePage } from '@/utils/toRouterPage';
import { Button, View } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import './index.less';

definePageConfig({
  navigationBarTitleText: '首页',
});

const Index = () => {
  const rect = useNodeRect('test');
  console.log(rect);
  useLoad(() => {
    getMockList();
  });

  return (
    <View className="index flex flex-col items-center justify-center py-[50px]">
      <TaroLogo />
      <Count />
      <Button
        id="test"
        type="primary"
        className="taro-btn-reset mt-[50px]"
        onClick={() => {
          toPackageAHomePage();
        }}
      >
        toPackageAHomePage
      </Button>
      <Button
        type="primary"
        className="taro-btn-reset mt-[50px]"
        onClick={() => {
          toContainerPage();
        }}
      >
        toContainerPage
      </Button>
    </View>
  );
};

export default Index;
