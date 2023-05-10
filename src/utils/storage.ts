import Taro from '@tarojs/taro';

type TmpData = { data: any; exp?: number; startTime: number };

/**
 * 有过期时间的本地存储
 */
const storage = {
  //本地永久存储写入有效期，有效期内会取出来，失效后会清空。exp 是有效时间的毫秒数
  setLocalStorage(key: string, value: any, exp?: number) {
    let tmpData: TmpData = { data: value, exp, startTime: new Date().getTime() };
    Taro.setStorageSync(key, tmpData);
  },
  //本地取出存储的值
  getLocalStorage(key: string) {
    const tmpData = Taro.getStorageSync(key) ?? null;
    return this.handleLocalDataBack(tmpData, key);
  },
  //本地删除存储
  removeLocalStorage(key) {
    Taro.removeStorageSync(key);
  },

  // 移除本地所有的过期的缓存
  removeAllLocalExp() {
    let that = this;
    Taro.getStorageInfo({
      success: function (res) {
        let keys = res.keys;
        keys.forEach(key => {
          that.handleLocalDataBack(Taro.getStorageSync(key), key);
        });
      },
    });
  },
  // 处理数据本地数据缓存返回
  handleLocalDataBack(tmpData: TmpData, key: string) {
    let returnData: any = null;
    let date = new Date().getTime();
    // 如果有设置过期时间
    if (tmpData && tmpData.exp) {
      if (date - tmpData.startTime > tmpData.exp) {
        //缓存过期，清除缓存，返回false
        Taro.removeStorageSync(key);
        returnData = null;
      } else {
        //缓存未过期，返回值
        returnData = tmpData.data;
      }
    } else {
      returnData = tmpData?.data;
    }
    return returnData;
  },
};

export default storage;
