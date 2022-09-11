import { getNavBarHeight } from "@/components/Container/helper";
import { getCurrentInstance } from "@tarojs/taro";

export function getSafeTop(){
  const { app, page } = getCurrentInstance();
  const navBarHeight = getNavBarHeight();
  const isCustomNavigation =
    //@ts-ignore
    app?.config?.window?.navigationStyle === 'custom' ||
    page?.config?.navigationStyle === 'custom';
  console.log(navBarHeight);

  return isCustomNavigation ? navBarHeight : 0;
}
