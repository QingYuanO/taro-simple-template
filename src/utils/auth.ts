import Taro from '@tarojs/taro';
import { authStore } from '@/src/stores/auth';

export const getLoginStatus = () => {
  return !!authStore.getState().token;
};

/**
 *
 * @description 自动生成的路由跳转函数会使用此函数包裹
 */
export const wrapFunWithAuth = (fun: (arg?: any) => void, option?: { isAutoToLoginPage?: boolean }) => {
  const { isAutoToLoginPage } = option ?? { isAutoToLoginPage: true };
  const isLogin = getLoginStatus();
  if (isLogin) {
    fun();
    return true;
  } else if (isAutoToLoginPage) {
    //自定义操作:提示或者跳转到登录页
    Taro.showToast({
      title: '请先登录',
      icon: 'none',
    });
  }
  return false;
};
