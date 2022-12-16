import { useGlobalIconFont } from './components/OriginalIconFont/helper';

export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/container/index',
    'pages/tailwindPluginExample/index',
    'pages/listExample/index',
    'pages/themeExample/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'WeChat',
    navigationStyle:'custom'
  },
  subPackages: [
    {
      root: 'packageA',
      pages: ['pages/home/index'],
    },
  ],
  // eslint-disable-next-line react-hooks/rules-of-hooks
  usingComponents: Object.assign(useGlobalIconFont()),
});
