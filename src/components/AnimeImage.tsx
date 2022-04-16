import { useGetSfwWaifuQuery } from "@/service/apis/imgApi";

import { View, Image, Text } from "@tarojs/components";
import { memo } from "react";

const AnimeImage = () => {
  const { data, error, isLoading, isSuccess, refetch } = useGetSfwWaifuQuery();
  console.log(data);

  const onGetImage = async () => {
    refetch();
  };
  return (
    <View className="mt-100px flex flex-col">
      <View
        className="w-500px min-h-600px shadow-lg flex flex-col items-center justify-center"
        onClick={onGetImage}
      >
        {data?.url && (
          <>
            <Image
              src={data.url}
              className="w-full h-full"
              style={{ display: isSuccess ? "inherit" : "none" }}
              mode="widthFix"
            />
            {isLoading && <Text>加载中...</Text>}
          </>
        )}
      </View>
    </View>
  );
};

export default memo(AnimeImage);
