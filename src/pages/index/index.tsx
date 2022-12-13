import Count from '@/components/Count';
import TaroLogo from '@/components/TaroLogo';
import useNodeRect from '@/hooks/useNodeRect';
import { getMockList } from '@/service/apis/mock';
import { toContainerPage, toPackageAHomePage } from '@/utils/toRouterPage';
import { Button, Text, View } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { useState } from 'react';
import './index.less';

definePageConfig({
  navigationBarTitleText: '首页',
});

const Index = () => {
  const rect = useNodeRect('test');
  const [isShow, setIsShow] = useState(false);
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
      <View className="mx-5 line-clamp-3">
        Et molestiae hic earum repellat aliquid est doloribus delectus. Enim illum odio porro ut omnis dolor debitis natus. Voluptas
        possimus deserunt sit delectus est saepe nihil. Qui voluptate possimus et quia. Eligendi voluptas voluptas dolor cum. Rerum est quos
        quos id ut molestiae fugit.
      </View>
      <View className="align-content-center m-5 rounded border border-solid border-red-400 bg-red-200 p-5 text-center danger-arrow-top">
        TOP ARROW
      </View>
      <Button
        type="primary"
        className="taro-btn-reset mt-[50px] "
        onClick={() => {
          setIsShow(!isShow);
        }}
      >
        toggle
      </Button>
      <View
        className={` fixed inset-x-0  bottom-0 rounded-t-md bg-red-300 transition-all duration-500 ease-out-circ ${
          isShow ? 'h-[50vh]' : 'h-0'
        } `}
      >
        内容
        <Button
          onClick={() => {
            setIsShow(!isShow);
          }}
        >
          关闭
        </Button>
      </View>
    </View>
  );
};

export default Index;
