import { View } from '@tarojs/components';
import { Button } from '@nutui/nutui-react-taro';
import Container from '@/components/Container';
import Count from '@/components/Count';
import TaroLogo from '@/components/TaroLogo';
import useNodeRect from '@/hooks/useNodeRect';

import {
  toContainerPage,
  toListExamplePage,
  toPackageAHomePage,
  toTailwindPluginExamplePage,
  toThemeExamplePage,
} from '@/utils/toRouterPage';

import './index.less';

definePageConfig({
  navigationBarTitleText: '首页',
});

const Index = () => {
  const rect = useNodeRect('test');

  return (
    <Container className="index py-5 flex-col-center">
      <TaroLogo />
      <Count />
      <View className="mt-5 flex flex-col gap-y-4">
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
        <Button
          type="primary"
          onClick={() => {
            toThemeExamplePage();
          }}
        >
          toThemeExamplePage
        </Button>
      </View>
    </Container>
  );
};

export default Index;
