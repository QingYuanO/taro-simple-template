import Container from '@/components/Container';
import themeStore from '@/utils/theme';
import { Button } from '@antmjs/vantui';
import { View } from '@tarojs/components';

definePageConfig({
  navigationBarTitleText: '测试暗黑模式',
});

const ThemeExample = () => {
  const themeMode = themeStore.useTracked.themeMode();
  return (
    <Container className="gap-y-5 py-5 flex-col-center">
      <View className="bg-slate-300 square-10 flex-center dark:bg-red-400">1</View>
      <View className="bg-slate-300 circular-10 flex-center">1</View>
      <Button
        type="primary"
        onClick={() => {
          themeStore.set.themeMode(themeMode === 'base' ? 'dark' : 'base');
        }}
      >
        {themeMode === 'dark' ? '基本模式' : '暗黑模式'}
      </Button>
    </Container>
  );
};

export default ThemeExample;
