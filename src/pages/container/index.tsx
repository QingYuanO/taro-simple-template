import Container from '@/components/Container';
import useNodeInViewport from '@/hooks/useNodeInViewport';
import { View } from '@tarojs/components';

definePageConfig({
  navigationStyle: 'custom',
});

export default function ContainerPage() {
  const { show } = useNodeInViewport('test1');
  return (
    <Container>
      <Container.Navbar title={show ? 'container-test' : '嘿嘿'} />
      <Container.Content>
        <View className='mb-[20px] bg-green-300' id='test1'>
          1
        </View>
        <View className='mb-[10px] h-[1400px] bg-blue-500'>container</View>
      </Container.Content>
      <Container.Footer>
        <View className='bg-red-400'>1</View>
      </Container.Footer>
    </Container>
  );
}
