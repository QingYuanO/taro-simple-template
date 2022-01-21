import useUpdateEffect from "@/hooks/useUpdateEffect";
import { getSingleImgThunk } from "@/pages/index/slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { View, Image, Text } from "@tarojs/components";
import { useState, memo, useEffect } from "react";

const AnimeImage = () => {
  const dispatch = useAppDispatch();
  const img = useAppSelector((state) => state.index.imageUrl);
  const isFetchImg = useAppSelector((state) => state.index.isFetchImg);
  const [isImageLoad, setIsImageLoad] = useState(false);
  useEffect(() => {
    dispatch(getSingleImgThunk());
  }, [dispatch]);
  useUpdateEffect(() => {
    if (isFetchImg) {
      setIsImageLoad(false);
    }
  }, [isFetchImg]);
  const onGetImage = async () => {
    dispatch(getSingleImgThunk());
  };
  return (
    <View className="mt-100px flex flex-col">
      <View
        className="w-500px min-h-600px shadow-lg flex flex-col items-center justify-center cur"
        onClick={onGetImage}
      >
        {img && (
          <>
            <Image
              src={img}
              className="w-full h-full"
              style={{ display: isImageLoad ? "inherit" : "none" }}
              mode="widthFix"
              onLoad={() => setIsImageLoad(true)}
            />
            {!isImageLoad && <Text>加载中...</Text>}
          </>
        )}
      </View>
    </View>
  );
};

export default memo(AnimeImage);
