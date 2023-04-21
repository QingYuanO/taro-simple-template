import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import TaroStorage from '@/src/utils/TaroStorage';

export type AuthStoreKV = Utils.StoreKV<Omit<IAuthStore, 'setAuthStore'>>;
export interface IAuthStore {
  token: string;
  setAuthStore: (key: AuthStoreKV['k'], value: AuthStoreKV['v']) => void;
}

export const authStore = create<IAuthStore>()(
  immer(
    persist(
      set => ({
        token: '',
        setAuthStore: (key, value) =>
          set(state => {
            (state[key] as AuthStoreKV['v']) = value;
          }),
      }),
      {
        name: 'auth',
        storage: createJSONStorage(() => TaroStorage),
      }
    )
  )
);

export const useAuthStore = createSelectorFunctions(authStore);

export const useIsLogin = () => {
  const token = useAuthStore.use.token();
  return !!token;
};
