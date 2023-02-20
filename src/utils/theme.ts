import { createStore } from '@udecode/zustood';

import getStorage from './getStorage';

type ThemeMode = 'dark' | 'base';

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
