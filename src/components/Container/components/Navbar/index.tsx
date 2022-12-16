import themeStore from '@/utils/theme';
import { Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Fragment, memo, useMemo } from 'react';
import { getNavBarHeight } from '../../helper';
import { NavbarProps } from '../../types';
import DefaultLeftIcon from './defaultLeftIcon';
import './index.less';

export default memo(function Navbar(props: NavbarProps) {
  const themeMode = themeStore.useTracked.themeMode();
  const defaultBgColor = themeMode === 'base' ? '#fff' : '#000';
  const defaultFontColor = themeMode === 'base' ? 'rgb(0,0,0)' : 'rgb(255,255,255)';
  const { children, title, leftIcon, titleClassName, bgColor, defaultLeftIconSize = 24, defaultLeftColor, hasSeat } = props;
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
        className="taro-container__navbar-wrap"
        style={{
          height: navBarHeight,
          paddingTop: navbarTop,
          paddingBottom: 5,
          backgroundColor: bgColor ?? defaultBgColor,
        }}
      >
        {children ?? (
          <View className="taro-container__navbar-content-wrap">
            <View className="taro-container__left-operation">
              {leftIcon ?? <DefaultLeftIcon size={defaultLeftIconSize} color={defaultLeftColor ?? defaultFontColor} />}
            </View>
            {title && (
              <View className="taro-container__title-wrap">
                <Text className={`taro-container__title ${themeMode === 'base' ? 'text-black' : 'text-white'} ${titleClassName ?? ''}`}>
                  {title}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
      {hasSeat && <View style={{ height: navBarHeight }}></View>}
    </Fragment>
  );
});
