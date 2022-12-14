/* eslint-disable import/no-commonjs */
const path = require('path');
const { generateToRouterMethods } = require('./utils');

// eslint-disable-next-line no-unused-vars
module.exports = (ctx, options) => {
  ctx.registerCommand({
    // 命令名
    name: 'grm', //generate-router-methods
    async fn() {
      console.log('开始生成');
      const appConfigPath = ctx.helper.resolveMainFilePath(path.resolve(ctx.paths.sourcePath, './app.config'));
      const appConfig = ctx.helper.readConfig(appConfigPath);
      let pagePath = [...appConfig.pages.map(page => `/${page}`)];
      if (appConfig.subPackages) {
        appConfig.subPackages.forEach(p => {
          p.pages.forEach(packagePage => {
            pagePath.push(`/${p.root}/${packagePage}`);
          });
        });
      }
      // console.log(appConfig);
      console.log(pagePath);
      ctx.helper.fs.writeFile(ctx.paths.sourcePath + '/utils/toRouterPage.ts', generateToRouterMethods(pagePath, ctx), function (err) {
        console.log(`生成--路由函数（${pagePath.length}个）`);
        if (err) {
          throw err;
        }
      });
    },
  });
  ctx.modifyBuildAssets(({ assets }) => {
    console.log(assets);
  });
};
