/* eslint-disable import/no-commonjs */
const path = require('path');
const { UnifiedWebpackPluginV5 } = require('weapp-tailwindcss-webpack-plugin');

const config = {
  projectName: 'taro-simple-template',
  date: '2021-11-19',
  designWidth: 375,
  //项目中px转换为rpx的比例,先将px转换为rpx,然后将rpx转换成个平台的单位
  deviceRatio: {
    375: 2 / 1, //小程序：1px=2rpx，h5：1px=(1px/baseFontSize)rem
    640: 2.34 / 2,
    750: 1,//小程序：1px=1rpx，h5：2px=(1px/baseFontSize)rem
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: [
    //本地插件
    path.resolve(__dirname, '..', 'src/plugin/index'),
    '@tarojs/plugin-html',
  ],
  defineConstants: {},
  alias: {
    //根目录
    '@/src': path.resolve(__dirname, '..', 'src'),
    '@/mock': path.resolve(__dirname, '..', 'mock'),
  },
  copy: {
    patterns: [],
    options: {},
  },
  framework: 'react',
  compiler: {
    type: 'webpack5',
    // 仅 webpack5 支持依赖预编译配置
    prebundle: {
      enable: false,
    },
  },
  cache: {
    enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  sass: {
    data: `@import "@nutui/nutui-react-taro/dist/styles/variables.scss";`,
  },
  mini: {
    miniCssExtractPluginOption: {
      ignoreOrder: true,
    },
    webpackChain(chain) {
      chain.merge({
        plugin: {
          install: {
            plugin: UnifiedWebpackPluginV5,
            args: [
              {
                appType: 'taro',
                // 注意这一行(不传默认 react)
                framework: 'react', // 'vue2' / 'vue3'
              },
            ],
          },
        },
      });
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: { selectorBlackList: ['nut-', 'nutui-'] },
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  h5: {
    esnextModules: [/@antmjs[\\/]vantui/],
    publicPath: '/',
    staticDirectory: 'static',
    router: {
      mode: 'browser', // 或者是 'browser'
    },
    postcss: {
      autoprefixer: {
        enable: true,
      },
      pxtransform: {
        enable: true,
        config: { baseFontSize: 16, maxRootSize: 32, minRootSize: 16 },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
};

export default function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  }
  return merge({}, config, require('./prod'));
}
