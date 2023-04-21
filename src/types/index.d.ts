declare module Utils {
  type StoreKV<T extends Record<string, any>> = {
    k: keyof T;
    v: T[keyof T];
  };
}
