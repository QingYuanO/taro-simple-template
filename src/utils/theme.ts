import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import TaroStorage from './TaroStorage';

type ThemeMode = 'dark' | 'base';

interface ThemeStore {
  themeMode: ThemeMode;
  themeChange: (by: ThemeMode) => void;
}

const useThemeStore = create<ThemeStore>()(
  persist(
    set => ({
      themeMode: 'base',
      themeChange: by => set(() => ({ themeMode: by })),
    }),
    {
      name: 'theme',
      storage: createJSONStorage(() => TaroStorage),
    }
  )
);

export default useThemeStore;
