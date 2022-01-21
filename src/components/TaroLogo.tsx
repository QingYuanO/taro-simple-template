import { Image } from "@tarojs/components";
import taro_logo from "@/assets/images/logo-taro.png";

const TaroLogo = () => {
  return <Image className="p-30px h-60px w-60px bg-blue-500" src={taro_logo} />;
};

export default TaroLogo;
