import { createTwc } from 'react-twc';
import Taro, { EventChannel } from '@tarojs/taro';
import { ClassValue } from 'class-variance-authority/dist/types';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

//只能在微信小程序中使用
export const getOpenerEventChannel: () => EventChannel = () => {
  //@ts-ignore
  return Taro.getCurrentInstance().page.getOpenerEventChannel();
};

export const pt = (num: number) => {
  const { screenWidth } = Taro.getSystemInfoSync();
  return num * (screenWidth / 375);
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const twx = createTwc({
  compose: twMerge,
});
