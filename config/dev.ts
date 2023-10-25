import type { UserConfigExport } from '@tarojs/cli';

const mockPort = { h5: 9527, weapp: 9528 }[process.env.TARO_ENV ?? 'weapp'];

export default {
  logger: {
    quiet: false,
    stats: true,
  },
  plugins: [
    [
      '@tarojs/plugin-mock',
      {
        port: mockPort,
      },
    ],
  ],
  mini: {
    webpackChain: () => {
      // chain.merge({
      //   plugin: {
      //     install: {
      //       //开发环境启动代码压缩，使得小程序可预览
      //       plugin: require("terser-webpack-plugin"),
      //       args: [
      //         {
      //           terserOptions: {
      //             compress: true, // 默认使用terser压缩
      //             // mangle: false,
      //             keep_classnames: true, // 不改变class名称
      //             keep_fnames: true, // 不改变函数名称
      //           },
      //         },
      //       ],
      //     },
      //   },
      // });
    },
  },
  h5: {},
} satisfies UserConfigExport;
