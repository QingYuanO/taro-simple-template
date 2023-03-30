import Taro, { EventChannel } from '@tarojs/taro';

//只能在微信小程序中使用
export const getOpenerEventChannel: () => EventChannel = () => {
  //@ts-ignore
  return getCurrentInstance().page.getOpenerEventChannel();
};

export const pixelTransform = (num: number) => {
  const { screenWidth } = Taro.getSystemInfoSync();
  return num * (screenWidth / 375);
};
