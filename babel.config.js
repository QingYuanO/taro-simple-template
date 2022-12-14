// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
// eslint-disable-next-line import/no-commonjs
module.exports = {
  presets: [
    [
      'taro',
      {
        framework: 'react',
        ts: true,
      },
    ],
  ],
  plugins: [
    [
      'import',
      {
        libraryName: '@antmjs/vantui',
        libraryDirectory: 'es',
         // 指定样式路径，建议这里样式按需引入不开启，直接在app.less引入全局样式
        // style: (name) => `${name}/style/less`,
      },
      '@antmjs/vantui',
    ],
  ],
};
