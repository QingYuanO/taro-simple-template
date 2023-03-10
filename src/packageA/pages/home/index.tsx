import AnimeImage from '@/src/components/AnimeImage';
import Container from '@/src/components/Container';
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
    <Container>
      <View>
        <View className="index py-50px flex flex-col items-center justify-center">
          <AnimeImage />
        </View>
      </View>
    </Container>
  );
};

export default Home;
