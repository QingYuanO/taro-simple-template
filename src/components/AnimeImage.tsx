import { useAppDispatch, useAppSelector } from "@/store-hooks";
import { Button, View,Image,Text } from "@tarojs/components";
import { useState,memo } from "react";
import { getSingleImgThunk } from "../pages/index/slice";


const AnimeImage = () => {
  const dispatch = useAppDispatch();
  const img = useAppSelector((state) => state.index.imageUrl);
  const [isImageLoad, setIsImageLoad] = useState(false);
  const onGetImage = async () => {
    try {
      await dispatch(getSingleImgThunk()).unwrap();
      setIsImageLoad(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="mt-100px flex flex-col">
      <View className="w-500px min-h-600px shadow-lg flex flex-col items-center justify-center" onClick={onGetImage}>
        {img ? (
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
        ) : (
          <Text>点击获取图片</Text>
        )}
      </View>
    </View>
  );
};

export default memo(AnimeImage) ;
