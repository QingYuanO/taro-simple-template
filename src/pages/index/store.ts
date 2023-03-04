import { create } from 'zustand';

const log = config => (set, get, api) =>
  config(
    (...args) => {
      console.log('  applying', args);
      set(...args);
      console.log('  new state', get());
    },
    get,
    api
  );

export const useBeeStore = create(
  log(set => ({
    bees: false,
    setBees: input => set({ bees: input }),
  }))
);
