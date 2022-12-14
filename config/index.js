/* eslint-disable import/no-commonjs */
const path = require('path');
const { TaroWeappTailwindcssWebpackPluginV5 } = require('weapp-tailwindcss-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const mockPort = process.env.TARO_ENV === 'h5' ? 9527 : 9528;

const config = {
  compiler: 'webpack5',
  projectName: 'taro-simple-template',
  date: '2021-11-19',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: [
    //本地插件
    path.resolve(__dirname, '..', 'src/plugin/index'),
    [
      '@tarojs/plugin-mock',
      {
        port: mockPort,
      },
    ],
    // [
    //   '@tarojs/plugin-inject',
    //   {
    //     components: {
    //       Button: {
    //         class: 'taro-btn-reset',
    //         dataIndex:"index"
    //       },
    //     },
    //   },
    // ],
  ],
  defineConstants: {},
  alias: {
    //根目录
    '@': path.resolve(__dirname, '..', 'src'),
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/hooks': path.resolve(__dirname, '..', 'src/hooks'),
    '@/store': path.resolve(__dirname, '..', 'src/store'),
    '@/constants': path.resolve(__dirname, '..', 'src/constants'),
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
    '@/service': path.resolve(__dirname, '..', 'src/service'),
    '@/pages': path.resolve(__dirname, '..', 'src/pages'),
    '@/types': path.resolve(__dirname, '..', 'src/types'),
  },
  copy: {
    patterns: [],
    options: {},
  },
  framework: 'react',
  mini: {
    miniCssExtractPluginOption: {
      ignoreOrder: true,
    },
    webpackChain(chain) {
      chain.merge({
        plugins: [new LodashModuleReplacementPlugin()],
      });

      chain.merge({
        plugin: {
          install: {
            plugin: TaroWeappTailwindcssWebpackPluginV5,
            args: [
              {
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
        config: {},
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
    webpackChain(chain) {
      chain.merge({
        plugins: [new LodashModuleReplacementPlugin()],
      });
    },
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
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
