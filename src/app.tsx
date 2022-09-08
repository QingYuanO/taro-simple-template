import { PropsWithChildren, useEffect } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
  onlineManager,
} from '@tanstack/react-query';
import './app.less';
import { useDidHide, useDidShow } from '@tarojs/taro';
import Taro from '@tarojs/taro';

const queryClient = new QueryClient();

function App({ children }: PropsWithChildren<{}>) {
  useEffect(() => {
    //从无网络状态变为有网络时react-query自动重新发起请求
    function onlineChange(res) {
      if (onlineManager.isOnline() === res.isConnected) return;
      onlineManager.setOnline(res.isConnected);
    }
    Taro.onNetworkStatusChange(onlineChange);
    return () => {
      Taro.offNetworkStatusChange(onlineChange);
    };
  }, []);

  useDidShow(() => {
    focusManager.setFocused(true);
  });
  useDidHide(() => {
    focusManager.setFocused(false);
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default App;
