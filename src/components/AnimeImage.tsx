import { getSingleImg } from '@/service/apis/img';

import { View, Image, Text } from '@tarojs/components';
import { memo } from 'react';
import { useQuery } from '@tanstack/react-query';

const AnimeImage = () => {
  const { data, isFetching, refetch } = useQuery(['getSingleImg'], getSingleImg);
  console.log(data);

  const onGetImage = async () => {
    refetch();
  };
  return (
    <View className="mt-[100px] flex flex-col">
      <View className="flex min-h-[600px] w-[500px] flex-col items-center justify-center shadow-lg" onClick={onGetImage}>
        {data?.url && (
          <>
            <Image src={data.url} className="h-full w-full" style={{ display: !isFetching ? 'inherit' : 'none' }} mode="widthFix" />
            {isFetching && <Text>加载中...</Text>}
          </>
        )}
      </View>
    </View>
  );
};

export default memo(AnimeImage);
