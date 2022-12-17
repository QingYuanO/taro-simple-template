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
    <Container>
      <View className="gap-y-5 py-5 flex-col-center">
        <View className="bg-slate-300 text-word-primary square-10 flex-center dark:bg-black dark:text-white">1</View>
        <View className="bg-slate-300 text-word-primary  circular-10 flex-center dark:bg-black dark:text-white">1</View>
        <Button
          type="primary"
          onClick={() => {
            themeStore.set.themeMode(themeMode === 'base' ? 'dark' : 'base');
          }}
        >
          {themeMode === 'dark' ? '基本模式' : '暗黑模式'}
        </Button>
      </View>
    </Container>
  );
};

export default ThemeExample;
