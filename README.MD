## taro-simple-template

使用以下模块

- 使用 TS
- 使用 less
- 使用[react-query](https://react-query.tanstack.com/quick-start)
- 使用[zustand](https://github.com/pmndrs/zustand)
- 添加[weapp-tailwindcss-webpack-plugin](https://github.com/sonofmagic/weapp-tailwindcss-webpack-plugin)，可以使用[`tailwind`](https://tailwindcss.com/)
- ahooks：注意，与浏览器相关的 hook 不可用
- 添加自动生成路由函数的本地 taro 指令 `taro grm`,具体可看[文章](https://juejin.cn/post/7042970323980910599)
- 使用[taro-iconfont-cli](https://github.com/iconfont-cli/taro-iconfont-cli#readme)生成多彩图标,使用方法：修改根目录下的`iconfont.json`中的`symbol_url`为自己 iconfont 项目中的对应值，执行`npx iconfont-taro`
