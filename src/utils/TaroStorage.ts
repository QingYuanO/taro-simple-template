import Taro from '@tarojs/taro';
import { StateStorage } from 'zustand/middleware';

import storage from './storage';

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

/**
 * 获取可以过期的 TaroStorage
 * @param exp 过期时间，单位毫秒
 * @returns
 */
export const getExpTaroStorage = (exp: number): StateStorage => {
  return {
    getItem(name) {
      return storage.getLocalStorage(name);
    },
    setItem(name, value) {
      storage.setLocalStorage(name, value, exp);
    },
    removeItem(name) {
      storage.removeLocalStorage(name);
    },
  };
};

export default TaroStorage;
