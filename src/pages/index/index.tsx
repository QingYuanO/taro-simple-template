import Container from '@/components/Container';
import Count from '@/components/Count';
import TaroLogo from '@/components/TaroLogo';
import useNodeRect from '@/hooks/useNodeRect';

import { toContainerPage, toListExamplePage, toPackageAHomePage, toTailwindPluginExamplePage } from '@/utils/toRouterPage';
import { Button } from '@antmjs/vantui';
import { View } from '@tarojs/components';
import './index.less';

definePageConfig({
  navigationBarTitleText: '首页',
});

const Index = () => {
  const rect = useNodeRect('test');

  return (
    <Container className="index flex flex-col items-center justify-center py-5">
      <TaroLogo />
      <Count />
      <View className="flex flex-col gap-y-4 mt-5">
        <Button
          id="test"
          type="primary"
          onClick={() => {
            toPackageAHomePage();
          }}
        >
          toPackageAHomePage
        </Button>
        <Button
          type="primary"
          onClick={() => {
            toContainerPage();
          }}
        >
          toContainerPage
        </Button>
        <Button
          type="primary"
          onClick={() => {
            toTailwindPluginExamplePage();
          }}
        >
          toTailwindPluginExamplePage
        </Button>
        <Button
          type="primary"
          onClick={() => {
            toListExamplePage();
          }}
        >
          toListExamplePage
        </Button>
      </View>
    </Container>
  );
};

export default Index;
