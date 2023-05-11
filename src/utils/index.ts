import Taro, { EventChannel } from '@tarojs/taro';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

//只能在微信小程序中使用
export const getOpenerEventChannel: () => EventChannel = () => {
  //@ts-ignore
  return Taro.getCurrentInstance().page.getOpenerEventChannel();
};

export const pixelTransform = (num: number) => {
  const { screenWidth } = Taro.getSystemInfoSync();
  return num * (screenWidth / 375);
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
