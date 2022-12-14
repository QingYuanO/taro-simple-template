import Container from '@/components/Container';
import Count from '@/components/Count';
import TaroLogo from '@/components/TaroLogo';
import useNodeRect from '@/hooks/useNodeRect';
import { getMockList } from '@/service/apis/mock';
import { toContainerPage, toPackageAHomePage, toTailwindPluginExamplePage } from '@/utils/toRouterPage';
import { Button } from '@antmjs/vantui';
import { Text, View } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { useState } from 'react';
import './index.less';

definePageConfig({
  navigationBarTitleText: '首页',
});

const Index = () => {
  const rect = useNodeRect('test');
  useLoad(() => {
    getMockList();
  });

  return (
    <Container className="index flex flex-col items-center justify-center py-5">
      <TaroLogo />
      <Count />
      <View className='flex flex-col gap-y-5'>
        <Button
          id="test"
          type="primary"
          className="mt-5"
          onClick={() => {
            toPackageAHomePage();
          }}
        >
          toPackageAHomePage
        </Button>
        <Button
          type="primary"
          className="mt-5"
          onClick={() => {
            toContainerPage();
          }}
        >
          toContainerPage
        </Button>
        <Button
          type="primary"
          className="mt-5"
          onClick={() => {
            toTailwindPluginExamplePage();
          }}
        >
          toTailwindPluginExamplePage
        </Button>
      </View>
    </Container>
  );
};

export default Index;
