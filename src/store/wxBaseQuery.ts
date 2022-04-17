import Taro from "@tarojs/taro";
import { createApi, BaseQueryFn } from "@reduxjs/toolkit/query";
import ApiService, { CustomData, CustomResult } from "../service";

const wxBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    Taro.request.Option<CustomResult, CustomData>,
    unknown,
    unknown
  > =>
  async ({ method, ...data },api,extraData) => {
    try {
      const result = await ApiService.baseOptions(
        { ...data, baseUrl },
        method ?? "GET"
      );
      return { data: result.data };
    } catch (err) {
      return {
        error: {
          status: err.statusCode,
          data: err.data.message || err.data,
        },
      };
    }
  };

export default wxBaseQuery;
