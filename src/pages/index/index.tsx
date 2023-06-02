import { View } from '@tarojs/components';
import Container from '@/src/components/Container';
import Count from '@/src/components/Count';
import TaroLogo from '@/src/components/TaroLogo';
import Button from '@/ui/Button';

import { pt } from '@/src/utils';
import {
  toContainerPage,
  toListExamplePage,
  toPackageAHomePage,
  toScrollViewListPage,
  toTailwindPluginExamplePage,
  toThemeExamplePage,
} from '@/src/utils/toRouterPage';
import { useAuthStore } from '@/src/store/auth';

definePageConfig({
  navigationBarTitleText: '首页',
});

const Index = () => {
  const setAuthStore = useAuthStore.use.setAuthStore();
  const token = useAuthStore.use.token();
  console.log('token', token);
  console.log('pt', pt(100));

  return (
    <Container className="index py-5 flex-col-center">
      <TaroLogo />
      <Count />
      <View className="mt-5 flex flex-col gap-y-4">
        <Button
          round
          onClick={() => {
            toPackageAHomePage();
          }}
        >
          toPackageAHomePage
        </Button>
        <Button
          round
          onClick={() => {
            toContainerPage();
          }}
        >
          toContainerPage
        </Button>
        <Button
          round
          onClick={() => {
            toTailwindPluginExamplePage();
          }}
        >
          toTailwindPluginExamplePage
        </Button>
        <Button
          round
          onClick={() => {
            toListExamplePage();
          }}
        >
          toListExamplePage
        </Button>
        <Button
          round
          onClick={() => {
            toScrollViewListPage({ isNeedLoginAuth: true });
          }}
        >
          toScrollViewListPage
        </Button>
        <Button
          round
          onClick={() => {
            toThemeExamplePage();
          }}
        >
          toThemeExamplePage
        </Button>
        <Button
          round
          onClick={() => {
            setAuthStore('token', '1');
          }}
        >
          setToken
        </Button>
      </View>
    </Container>
  );
};

export default Index;
