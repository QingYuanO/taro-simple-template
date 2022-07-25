module.exports = {
  env: {
    NODE_ENV: '"development"',
  },
  defineConstants: {},
  mini: {
    webpackChain: (chain) => {
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
};
