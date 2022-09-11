import Count from '@/components/Count';
import TaroLogo from '@/components/TaroLogo';
import useNodeInViewport from '@/hooks/useNodeInViewport';
import { toContainerPage, toPackageAHomePage } from '@/utils/toRouterPage';
import { Button, View } from '@tarojs/components';

import './index.less';

definePageConfig({
  navigationBarTitleText: '首页',
});

const Index = () => {
  const { show } = useNodeInViewport('test');
  return (
    <View className='index flex flex-col items-center justify-center py-[50px]'>

      <TaroLogo />
      <Count />
      <Button
        id='test'
        type='primary'
        className='mt-[50px]'
        onClick={() => {
          toPackageAHomePage();
        }}
      >
        toPackageAHomePage
      </Button>
      {
        show ?'show' : "hide"
      }
      <Button
        type='primary'
        className='mt-[50px]'
        onClick={() => {
          toContainerPage();
        }}
      >
        toContainerPage
      </Button>
      <View className='h-[1000px] w-full bg-red-400'></View>
    </View>
  );
};

export default Index;
