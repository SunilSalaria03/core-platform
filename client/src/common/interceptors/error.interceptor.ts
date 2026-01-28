import { axiosInstance } from "@/common/axios/axios.instance";

export function registerErrorInterceptor(onUnauthorized?: () => void) {
  axiosInstance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err?.response?.status === 401) onUnauthorized?.();
      return Promise.reject(err);
    }
  );
}
