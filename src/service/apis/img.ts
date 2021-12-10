import ApiService from ".."

export const getSingleImg = () => {
  return ApiService.get("https://api.waifu.pics/sfw/waifu",{showLoad:false})
}
