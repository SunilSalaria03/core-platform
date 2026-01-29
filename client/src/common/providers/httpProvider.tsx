"use client";

import { useEffect } from "react";
import {
  authInterceptor,
  errorInterceptor,
} from "../interceptors/common.interceptors";
import { axiosInstance } from "@/common/axios/instance.axios";
import { getFromStorage, removeFromStorage } from "../utils/storage.utils";

export default function HttpProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const authInterceptorId = authInterceptor(() => {
      if (typeof window === "undefined") return null;
      return getFromStorage("accessToken");
    });

    const errorInterceptorId = errorInterceptor(() => {
      if (typeof window !== "undefined") {
        removeFromStorage("accessToken");
      }
    });

    return () => {
      axiosInstance.interceptors.request.eject(authInterceptorId);
      axiosInstance.interceptors.response.eject(errorInterceptorId);
    };
  }, []);

  return <>{children}</>;
}
