declare module Utils {
  type StoreKV<T extends Record<string, any>> = {
    k: keyof T;
    v: T[keyof T];
  };
  /**
   * @description 通过链接传过来的任何类型的参数都会变成字符串，故需要转换
   */
  export type RouterStringParams<P> = {
    [key in keyof P]?: P[key] extends string ? P[key] : string;
  };
  /** 根据参数中的type去生成对应key的对象类型 */
  export type PageTitleKey<P extends { type: string }> = {
    [key in P['type']]: string;
  };
}
