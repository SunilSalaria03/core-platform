"use client";

import { useEffect } from "react";
import { registerAuthInterceptor, registerErrorInterceptor } from "../interceptors/common.interceptors";

export default function HttpProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerAuthInterceptor(() => {
      if (typeof window === "undefined") return null;
      return localStorage.getItem("accessToken");
    });

    registerErrorInterceptor(() => {
      if (typeof window !== "undefined") localStorage.removeItem("accessToken");
    });
  }, []);

  return <>{children}</>;
}
