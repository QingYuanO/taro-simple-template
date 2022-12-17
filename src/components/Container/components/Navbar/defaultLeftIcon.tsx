import { View } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import { memo, useEffect, useState } from 'react';
import { formattedRoutePath } from '../../helper';
import { IconProps } from '../../types';
import { BackIcon, HomeIcon } from '../icon';

export default memo(function DefaultLeftIcon({ size, color }: IconProps) {
  const [isShowDefaultLeftIcon, setIsShowDefaultLeftIcon] = useState(false);
  const [isShowBackIcon, setIsShowBackIcon] = useState(false);
  const [realEntryPagePath, setRealEntryPagePath] = useState('');
  useEffect(() => {
    // console.log(Taro.getCurrentInstance());
    // console.log(Taro.getCurrentPages());
    const { app } = Taro.getCurrentInstance();
    const currentPages = Taro.getCurrentPages();
    //@ts-ignore
    const { config } = app;
    //获取app.config的配置
    const { entryPagePath, pages, tabBar } = config;
    //获取首屏页面
    const reallyEntryPagePath = formattedRoutePath(entryPagePath ?? pages[0]);

    //获取tabBar页面路径
    const tabBarPaths = tabBar?.list?.map(t => formattedRoutePath(t.pagePath));

    const notBackIconPagePathArr: string[] = tabBarPaths?.length > 0 ? tabBarPaths : [reallyEntryPagePath];

    const showDefaultLeftIcon = !notBackIconPagePathArr.includes(formattedRoutePath(currentPages[currentPages.length - 1]?.route ?? ''));

    setIsShowBackIcon(currentPages.length > 1);
    setIsShowDefaultLeftIcon(showDefaultLeftIcon);
    setRealEntryPagePath(reallyEntryPagePath);
  }, []);

  const onBack = () => {
    Taro.navigateBack({
      fail() {
        Taro.reLaunch({ url: realEntryPagePath });
      },
    });
  };

  const onToEntryPage = () => {
    Taro.reLaunch({ url: realEntryPagePath });
  };

  if (!isShowDefaultLeftIcon) {
    return null;
  }
  return (
    <View onClick={isShowBackIcon ? onBack : onToEntryPage}>
      {isShowBackIcon ? <BackIcon size={size} color={color} /> : <HomeIcon size={size} color={color} />}
    </View>
  );
});
