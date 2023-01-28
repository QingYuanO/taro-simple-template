import { useState } from 'react';
import { Button, Text, View } from '@tarojs/components';
import Container from '@/components/Container';

definePageConfig({
  navigationBarTitleText: 'tailwind插件示例',
});

const TailwindPluginExample = () => {
  const [isShow, setIsShow] = useState(false);
  return (
    <Container>
      <View className="flex flex-col items-center justify-center py-[50px]">
        <View className="mx-5">
          <Text className="text-xs line-clamp-3">
            Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6
            将其写进了语言标准，统一了用法，原生提供了Promise对象。
          </Text>
        </View>
        <View className="align-content-center m-5 rounded border border-solid border-red-400 bg-red-200 p-5 text-center danger-arrow-right">
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
          className={`fixed inset-x-0  bottom-0 rounded-t-md bg-red-300 transition-all duration-500 ease-out-circ ${
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
    </Container>
  );
};

export default TailwindPluginExample;
