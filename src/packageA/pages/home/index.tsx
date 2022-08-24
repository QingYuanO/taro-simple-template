import AnimeImage from '@/components/AnimeImage';
import { View } from '@tarojs/components';

definePageConfig({
  navigationBarTitleText: 'packageA - home - page',
  animation: {
    duration: 300,
    delay: 50,
  },
});

const Home = () => {
  return (
    <View className='index py-50px flex flex-col items-center justify-center'>
      <AnimeImage />
    </View>
  );
};

export default Home;
