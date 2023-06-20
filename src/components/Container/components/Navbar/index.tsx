import { Fragment, memo, useMemo } from 'react';
import { Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import { pt } from '@/src/utils';
import useThemeStore from '@/src/stores/theme';

import { getNavBarHeight } from '../../helper';
import { NavbarProps } from '../../types';
import DefaultLeftIcon from './defaultLeftIcon';

export default memo(function Navbar(props: NavbarProps) {
  const themeMode = useThemeStore(state => state.themeMode);
  const {
    children,
    title,
    leftIcon,
    titleClassName,
    defaultLeftIconSize = 24,
    defaultLeftColor = themeMode === 'dark' ? 'rgb(255,255,255)' : 'rgb(0,0,0)',
    hasSeat,
  } = props;
  const navBarHeight = getNavBarHeight();
  const navbarTop = useMemo(() => {
    if (process.env.TARO_ENV === 'weapp') {
      const menuButtonBounding = Taro.getMenuButtonBoundingClientRect();
      return menuButtonBounding.top;
    }
    if (process.env.TARO_ENV === 'h5') {
      return 5;
    }
  }, []);
  return (
    <Fragment>
      <View
        id="taroContainerNavbar"
        className="fixed inset-x-0 top-0 flex items-center z-[800] box-border bg-white dark:bg-black shadow shadow-gray-200/50"
        style={{
          minHeight: navBarHeight,
          paddingTop: navbarTop,
          paddingBottom: 5,
        }}
      >
        {children ?? (
          <View className="flex items-center relative h-full w-full dark:bg-black">
            <View className="absolute top-1/2 flex items-center left-2" style={{ transform: 'translateY(-50%)' }}>
              {leftIcon ?? <DefaultLeftIcon size={pt(defaultLeftIconSize)} color={defaultLeftColor} />}
            </View>
            {title && (
              <View className="w-full flex-center text-base">
                <Text className={` font-medium text-black dark:text-white  ${titleClassName ?? ''}`}>{title}</Text>
              </View>
            )}
          </View>
        )}
      </View>
      {hasSeat && <View style={{ height: navBarHeight }}></View>}
    </Fragment>
  );
});
