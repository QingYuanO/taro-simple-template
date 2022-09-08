import Count from '@/components/Count';
import TaroLogo from '@/components/TaroLogo';
import { toContainerPage, toPackageAHomePage } from '@/utils/toRouterPage';
import { Button, View } from '@tarojs/components';
import './index.less';

definePageConfig({
  navigationBarTitleText: '首页',
});

const Index = () => {
  return (
    <View className='index flex flex-col items-center justify-center py-[50px]'>
      <TaroLogo />
      <Count />
      <Button
        type='primary'
        className='mt-[50px]'
        onClick={() => {
          toPackageAHomePage();
        }}
      >
        toPackageAHomePage
      </Button>
      <Button
        type='primary'
        className='mt-[50px]'
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
