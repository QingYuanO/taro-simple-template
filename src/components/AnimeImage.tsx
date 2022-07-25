import { useFirstMountState } from "@/hooks/useFirstMountState";
import { getSingleImg } from "@/service/apis/img";

import { View, Image, Text } from "@tarojs/components";
import { memo, useEffect } from "react";
import { useQuery } from "react-query";

const AnimeImage = () => {
  const { data, isLoading, isSuccess, refetch } = useQuery(
    ["getSingleImg"],
    getSingleImg
  );
  console.log(data);


  const onGetImage = async () => {
    refetch();
  };
  return (
    <View className="mt-[100px] flex flex-col">
      <View
        className="w-[500px] min-h-[600px] flex flex-col items-center justify-center shadow-lg"
        onClick={onGetImage}
      >
        {data?.url && (
          <>
            <Image
              src={data.url}
              className="h-full w-full"
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
