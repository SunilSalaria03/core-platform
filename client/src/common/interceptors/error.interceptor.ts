import { AxiosResponse } from "axios";
import { axiosInstance } from "../axios/instance.axios";

export function errorInterceptor(onUnauthorized?: () => void) {
  return axiosInstance.interceptors.response.use(
    (res: AxiosResponse) => res,
    (err) => {
      if (err?.response?.status === 401) onUnauthorized?.();
      return Promise.reject(err);
    }
  );
}
