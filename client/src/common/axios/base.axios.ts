// axiosBaseQuery.ts
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError } from "axios";
import { axiosInstance } from "./instance.axios";
import type { ApiResponseDto, IAxiosBaseQueryArgs } from "../dto/api.dto";
import { normalizeApiResponse } from "./error.axios";
import { HTTP_METHODS } from "../constants/http.constants";

export const axiosBaseQuery =
  (): BaseQueryFn<
    IAxiosBaseQueryArgs,
    unknown,
    { status?: number; data: ReturnType<typeof normalizeApiResponse> }
  > =>
  async ({ url, method = HTTP_METHODS.GET, data, params }) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
      });

      return {
        data: normalizeApiResponse(result.data),
      };
    } catch (e) {
      const err = e as AxiosError<ApiResponseDto<unknown>>;

      return {
        error: {
          status: err.response?.status,
          data: normalizeApiResponse(
            err.response?.data ?? {
              success: false,
              statusCode: err.response?.status ?? 500,
              message: err.message,
              data: null,
            }
          ),
        },
      };
    }
  };
