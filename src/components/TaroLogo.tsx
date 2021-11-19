import { Image } from "@tarojs/components";
import taro_logo from "@/assets/images/logo-taro.png";

const Tarologo = () => {
  return (
    <Image
      className="p-30rpx"
      src={taro_logo}
      style={{ height: 30, width: 30,backgroundColor:'blue' }}
    ></Image>
  );
};

export default Tarologo;
