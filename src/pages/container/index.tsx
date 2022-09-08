import Container from '@/components/Container';
import { View } from '@tarojs/components';

definePageConfig({
  navigationStyle: 'custom',
});

export default function ContainerPage() {
  return (
    <Container>
      <Container.Navbar title='container-test' />
      <Container.Content>
        <View className='h-[1400px] bg-blue-500 mb-[10px]'>container</View>
      </Container.Content>
      <Container.Footer>
        <View className='bg-red-400'>1</View>
      </Container.Footer>
    </Container>
  );
}
