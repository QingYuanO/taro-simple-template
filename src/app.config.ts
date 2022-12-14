import { useGlobalIconFont } from './components/OriginalIconFont/helper';

export default defineAppConfig({
  pages: ['pages/index/index', 'pages/container/index', 'pages/tailwindPluginExample/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    // navigationStyle:'custom'
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
