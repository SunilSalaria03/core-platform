// Auth interceptor
import type { InternalAxiosRequestConfig } from "axios";
import { axiosInstance } from "@/common/axios/instance.axios";
import { getFromStorage } from "../utils/common.utils";

export function authInterceptor(getToken?: () => string | null) {
  return axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token =
        typeof window !== "undefined"
          ? getToken?.() ?? getFromStorage("accessToken")
          : null;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    }
  );
}
