import { View } from "@tarojs/components";

definePageConfig({
  navigationBarTitleText: "packageA - home - page",
  animation: {
    duration: 300,
    delay: 50,
  },
});

const Home = () => {
  return (
    <View className="index flex flex-col justify-center items-center py-50px">
      packageA - home - page
    </View>
  );
};

export default Home;
