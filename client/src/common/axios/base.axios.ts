import type { BaseQueryFn, QueryReturnValue } from "@reduxjs/toolkit/query";
import type { AxiosError } from "axios";
import type { IAxiosBaseQueryArgs, IApiErrorShape } from "@/common/interfaces/api.interface";
import { axiosInstance } from "./axios.instance";

export const axiosBaseQuery =
  (): BaseQueryFn<IAxiosBaseQueryArgs, unknown, IApiErrorShape> =>
  async ({ url, method = "GET", data, params }: IAxiosBaseQueryArgs): Promise<QueryReturnValue<unknown, IApiErrorShape, object>> => {
    try {
      const result = await axiosInstance({ url, method, data, params });
      return { data: result.data };
    } catch (e) {
      const err = e as AxiosError<IApiErrorShape>;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data ?? { message: err.message } as unknown as IApiErrorShape,
        } as IApiErrorShape,
      };
    }
  };
