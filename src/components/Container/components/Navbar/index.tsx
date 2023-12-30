import { Fragment, memo, useMemo } from 'react';
import { Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import useThemeStore from '@/src/stores/theme';

import { pt } from '@/src/utils';

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
        className="fixed inset-x-0 top-0 z-[800] box-border flex items-center bg-background shadow shadow-gray-200/50 dark:shadow-black/20"
        style={{
          minHeight: navBarHeight,
          paddingTop: navbarTop,
          paddingBottom: 5,
        }}
      >
        {children ?? (
          <View className="relative flex h-full w-full items-center bg-background">
            <View className="absolute left-2 top-1/2 flex items-center" style={{ transform: 'translateY(-50%)' }}>
              {leftIcon ?? <DefaultLeftIcon size={pt(defaultLeftIconSize)} color={defaultLeftColor} />}
            </View>
            {title && (
              <View className="w-full text-base flex-center">
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
