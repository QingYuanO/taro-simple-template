import { Image } from '@tarojs/components';

import taro_logo from '@/src/assets/images/logo-taro.png';

const TaroLogo = () => {
  return <Image className="h-10 w-10 bg-blue-500 p-[30px]" src={taro_logo} />;
};

export default TaroLogo;
