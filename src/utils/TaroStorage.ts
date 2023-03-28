import Taro from '@tarojs/taro';
import { StateStorage } from 'zustand/middleware';

const TaroStorage: StateStorage = {
  getItem(name) {
    return Taro.getStorageSync(name);
  },
  setItem(name, value) {
    Taro.setStorageSync(name, value);
  },
  removeItem(name) {
    Taro.removeStorageSync(name);
  },
};

export default TaroStorage;
