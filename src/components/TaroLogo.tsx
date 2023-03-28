import { Image } from '@tarojs/components';

import taro_logo from '@/src/assets/images/logo-taro.png';

const TaroLogo = () => {
  return <Image className="h-14 w-14 bg-blue-500 p-4" src={taro_logo} />;
};

export default TaroLogo;
