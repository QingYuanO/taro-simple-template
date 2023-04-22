import { memo } from 'react';
import { Image, Text, View } from '@tarojs/components';

import { useSingleImg } from '@/src/service/apis/img';

const AnimeImage = () => {
  const { data, isFetching, refetch } = useSingleImg({
    onSuccess() {
      console.log('test1');
    },
  });
  console.log(data);

  const onGetImage = async () => {
    refetch();
  };
  return (
    <View className="mt-[100px] flex flex-col">
      <View className="flex min-h-[300px] w-[250px] flex-col items-center justify-center shadow-lg" onClick={onGetImage}>
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
