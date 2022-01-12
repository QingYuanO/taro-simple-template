//@ts-ignore
import { resolve } from "path";

const config = {
  projectName: "taro-simple-cli",
  date: "2021-11-19",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: "src",
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: [
    [
      "taro-plugin-tailwind",
      {
        // 具体参数见：https://github.com/windicss/vite-plugin-windicss/blob/main/packages/plugin-utils/src/options.ts#L10
      },
    ],
    //本地插件
    resolve(__dirname, "..", "src/plugin/index")
      .split(":")[1]
      .replace(/\\/g, "/"),
  ],
  defineConstants: {},
  alias: {
    "@/components": resolve(__dirname, "..", "src/components"),
    "@/utils": resolve(__dirname, "..", "src/utils"),
    "@/hooks": resolve(__dirname, "..", "src/hooks"),
    "@/store": resolve(__dirname, "..", "src/store"),
    "@/constants": resolve(__dirname, "..", "src/constants"),
    "@/assets": resolve(__dirname, "..", "src/assets"),
    "@/service": resolve(__dirname, "..", "src/service"),
    "@/pages": resolve(__dirname, "..", "src/pages"),
  },
  copy: {
    patterns: [],
    options: {},
  },
  framework: "react",
  mini: {
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
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
};

export default function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
}
