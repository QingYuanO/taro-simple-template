import { useFirstMountState } from "@/hooks/useFirstMountState";
import {
  useGetSfwWaifuQuery,
  useLazyGetSfwWaifuQuery,
} from "@/service/apis/imgApi";

import { View, Image, Text } from "@tarojs/components";
import { memo, useEffect } from "react";

const AnimeImage = () => {
  const [trigger, { data, isLoading, isSuccess }] = useLazyGetSfwWaifuQuery();
  useEffect(() => {
    trigger(null, true);
  }, [trigger]);
  console.log(data);

  const onGetImage = async () => {
    const { refetch } = trigger({ showLoad: true });
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
