import { View } from '@tarojs/components';
import { useAuthStore } from '@/src/stores/auth';
import Container from '@/src/components/Container';
import Count from '@/src/components/Count';
import TaroLogo from '@/src/components/TaroLogo';
import Button from '@/ui/Button';

import { pt } from '@/src/utils';
import {
  toContainerPage,
  toFormExamplePage,
  toListExamplePage,
  toPackageAHomePage,
  toScrollViewListPage,
  toTailwindPluginExamplePage,
  toThemeExamplePage,
} from '@/src/utils/toRouterPage';

definePageConfig({
  navigationBarTitleText: '首页',
});

const Index = () => {
  const setAuthStore = useAuthStore.use.setAuthStore();
  const token = useAuthStore.use.token();

  const options = [
    {
      label: 'toPackageAHomePage',
      onClick: () => {
        toPackageAHomePage();
      },
    },
    {
      label: 'toContainerPage',
      onClick: () => {
        toContainerPage();
      },
    },
    {
      label: 'toTailwindPluginExamplePage',
      onClick: () => {
        toTailwindPluginExamplePage();
      },
    },
    {
      label: 'toListExamplePage',
      onClick: () => {
        toListExamplePage();
      },
    },
    {
      label: 'toScrollViewListPage',
      onClick: () => {
        toScrollViewListPage({ isNeedLoginAuth: true });
      },
    },
    {
      label: 'toFormExamplePage',
      onClick: () => {
        toFormExamplePage();
      },
    },
    {
      label: 'toThemeExamplePage',
      onClick: () => {
        toThemeExamplePage();
      },
    },
    {
      label: 'setToken',
      onClick: () => {
        setAuthStore('token', '1');
      },
    },
  ];

  console.log('token', token);
  console.log('pt', pt(100));

  return (
    <Container className="index py-5 flex-col-center">
      <TaroLogo />
      <Count />
      <View className="mt-5 flex flex-col gap-y-4">
        {options.map(item => (
          <Button round key={item.label} onClick={item.onClick}>
            {item.label}
          </Button>
        ))}
      </View>
    </Container>
  );
};

export default Index;
