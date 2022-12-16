import Taro from '@tarojs/taro';
import { createStore } from '@udecode/zustood';
import getStorage from './getStorage';

type ThemeMode = 'dark' | 'base';

export const subscribeThemeMode = (state: { themeMode: ThemeMode }) => {
  if (state.themeMode === 'base') {
    Taro.setNavigationBarColor({ frontColor: '#000000', backgroundColor: '#FFFFFF' });
  }
  if (state.themeMode === 'dark') {
    Taro.setNavigationBarColor({ frontColor: '#ffffff', backgroundColor: '#000000' });
  }
};

const themeStore = createStore('theme')<{ themeMode: ThemeMode }>(
  {
    themeMode: 'base',
  },
  {
    persist: {
      enabled: true,
      name: 'theme',
      getStorage,
      onRehydrateStorage() {
        return (state, error) => {
          if (state) {
            // subscribeThemeMode(state);
          }
        };
      },
    },
  }
);
// themeStore.store.subscribe(subscribeThemeMode);

export default themeStore;
