import Container from '@/components/Container';
import useNodeDisappearInTop from '@/hooks/useNodeDisappearInTop';
import { View } from '@tarojs/components';
import { memo, useCallback, useMemo, useState } from 'react';

definePageConfig({
  navigationStyle: 'custom',
});

export default function ContainerPage() {
  const { show } = useNodeDisappearInTop('test1');
  const [testFooter, setTestFooter] = useState(false);
  const test = useCallback((rect) => {
    // console.log(rect);
  }, []);

  const testNode = useMemo(() => {
    console.log('re-render');
    return <View className='bg-red-400'>1</View>;
  }, []);

  return (
    <Container>
      <Container.Navbar title={show ? 'container-test' : '嘿嘿'} />
      <Container.Content>
        <View
          className='mb-[20px] bg-green-300'
          id='test1'
          onClick={() => setTestFooter(!testFooter)}
        >
          1
        </View>
        <View className='mb-[10px] h-[1400px] bg-blue-500'>container</View>
      </Container.Content>
      <Container.Footer onFooterRectChange={test} className='bg-white'>
        {testNode}
        {testFooter && <View className='bg-red-200'>testFooter</View>}
      </Container.Footer>
    </Container>
  );
}
