import Container from '@/components/Container';
import useNodeInViewport from '@/hooks/useNodeInViewport';
import { View } from '@tarojs/components';
import { useCallback, useState } from 'react';

definePageConfig({
  navigationStyle: 'custom',
});

export default function ContainerPage() {
  const { show } = useNodeInViewport('test1');
  const [testFooter, setTestFooter] = useState(false);
  const test = useCallback((rect) => {
    // console.log(rect);
    console.log(testFooter);

  }, []);

  return (
    <Container>
      <Container.Navbar title={show ? 'container-test' : '嘿嘿'} />
      <Container.Content>
        <View className='mb-[10px] h-[1400px] bg-blue-500'>container</View>
        <View
          className='mb-[20px] bg-green-300'
          id='test1'
          onClick={() => setTestFooter(!testFooter)}
        >
          1
        </View>
      </Container.Content>
      <Container.Footer onFooterRectChange={test}>
        <View className='bg-white'>
          <View className='bg-red-400'>1</View>
          {testFooter && <View>testFooter</View>}
        </View>
      </Container.Footer>
    </Container>
  );
}
