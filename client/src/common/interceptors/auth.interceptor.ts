import type { InternalAxiosRequestConfig } from "axios";
import { axiosInstance } from "@/common/axios/axios.instance";

export function registerAuthInterceptor() {
  axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
}

