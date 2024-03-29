import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import TaroStorage from '../utils/TaroStorage';

type ThemeMode = 'dark' | 'light';

interface ThemeStore {
  themeMode: ThemeMode;
  themeChange: (by: ThemeMode) => void;
}

const useThemeStore = create<ThemeStore>()(
  persist(
    set => ({
      themeMode: 'light',
      themeChange: by => set(() => ({ themeMode: by })),
    }),
    {
      name: 'theme',
      storage: createJSONStorage(() => TaroStorage),
    }
  )
);

export default useThemeStore;
