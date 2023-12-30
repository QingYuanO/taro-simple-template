import { useCallback, useMemo, useState } from 'react';
import { View } from '@tarojs/components';
import Container from '@/src/components/Container';
import useNodeDisappearInTop from '@/src/hooks/useNodeDisappearInTop';

definePageConfig({
  navigationStyle: 'custom',
});

export default function ContainerPage() {
  const { show } = useNodeDisappearInTop('test1');
  const [testFooter, setTestFooter] = useState(false);
  const test = useCallback(rect => {
    console.log(rect);
  }, []);

  const testNode = useMemo(() => {
    console.log('re-render');
    return <View className="bg-red-400">1</View>;
  }, []);

  return (
    <Container className="test">
      <Container.Navbar title={show ? 'container-test' : '嘿嘿'} />

      <View className="mb-[20px] bg-green-300" id="test1" onClick={() => setTestFooter(!testFooter)}>
        1
      </View>
      <View className="mb-[10px] h-[1400px] bg-blue-500">container</View>

      <Container.Footer onFooterRectChange={test} className="bg-white">
        {testNode}
        {testFooter && <View className="bg-red-200">testFooter</View>}
      </Container.Footer>
    </Container>
  );
}
