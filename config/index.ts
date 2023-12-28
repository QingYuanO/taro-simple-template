/* eslint-disable import/no-commonjs */
import { defineConfig, type UserConfigExport } from '@tarojs/cli';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

import devConfig from './dev';
import prodConfig from './prod';

const isH5 = process.env.TARO_ENV === 'h5';
const isApp = process.env.TARO_ENV === 'rn';
const isWeappTailwindcssDisabled = isH5 || isApp;

const path = require('path');
const { UnifiedWebpackPluginV5 } = require('weapp-tailwindcss/webpack');
// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig(async (merge, {}) => {
  const baseConfig: UserConfigExport = {
    projectName: 'taro-simple-template',
    date: '2021-11-19',
    designWidth: 750,
    //项目中书写16px
    deviceRatio: {
      375: 2 / 1, //转换:weapp-32rpx,h5-1rem
      640: 2.34 / 2,
      750: 1, //转换:weapp-16rpx,h5-0.5rem
      828: 1.81 / 2,
    },
    sourceRoot: 'src',
    outputRoot: `dist/${process.env.TARO_ENV}`,
    plugins: [
      //本地插件
      path.resolve(__dirname, '..', 'src/plugin/index'),
      ['@tarojs/plugin-html', {}],
      ['@tarojs/plugin-http', {}],
    ],
    defineConstants: {},
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
    sass: {},
    mini: {
      miniCssExtractPluginOption: {
        ignoreOrder: true,
      },
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin);
        chain.merge({
          plugin: {
            install: {
              plugin: UnifiedWebpackPluginV5,
              args: [
                {
                  appType: 'taro',
                  // 注意这一行(不传默认 react)
                  framework: 'react', // 'vue2' / 'vue3'
                  cssPreflightRange: 'all',
                  customAttributes: {
                    // 通配符，代表所有的标签都生效；数组里同时允许 字符串 和正则
                    '*': [/[A-Za-z]?[A-Za-z-]*[Cc]lass/],
                  },
                  mangle: process.env.NODE_ENV === 'production',
                  injectAdditionalCssVarScope: true,
                  disabled: isWeappTailwindcssDisabled,
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
      publicPath: '/',
      staticDirectory: 'static',
      output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js',
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css',
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {},
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
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin);
      },
    },
  };
  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig);
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig);
});

// module.exports = function (merge) {
//   if (process.env.NODE_ENV === 'development') {
//     return merge({}, config, require('./dev'));
//   }
//   return merge({}, config, require('./prod'));
// };
