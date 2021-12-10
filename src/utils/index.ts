import { EventChannel } from "@tarojs/taro";

//只能在微信小程序中使用
export const getOpenerEventChannel:() => EventChannel = () => {
  //@ts-ignore
  return getCurrentInstance().page.getOpenerEventChannel();
};
//是否是有效的url链接
export const isUrlLink = (url) => {
  const rep =
    /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
  return rep.test(url);
};
export const isPhoneNUmber = (phone) => {
  const phoneReg = /^1[3|4|5|7|8|9][0-9]\d{8}$/;
  return phoneReg.test(phone);
};

export const isIdCard = (idcard) => {
  const idcardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return idcardReg.test(idcard);
};

export const isEmail = (email) => {
  const emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return emailReg.test(email);
};

export const isFunction = (obj: any): obj is Function => {
  return typeof obj === 'function';
}
