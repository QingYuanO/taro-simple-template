import { Image } from "@tarojs/components";
import taro_logo from "@/assets/images/logo-taro.png";

const Tarologo = () => {
  return (
    <Image
      className="p-30px h-60px w-60px"
      src={taro_logo}
      style={{backgroundColor:'blue' }}
    ></Image>
  );
};

export default Tarologo;
