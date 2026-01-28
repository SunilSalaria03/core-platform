"use client";

import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useMeQuery } from "@/common/api/common.api";

export default function PublicGuard({
  children,
  redirectTo = "/admin/dashboard",
}: {
  children: React.ReactNode;
  redirectTo?: string;
}) {
  const router = useRouter();

  const hasToken = useMemo(() => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("accessToken");
  }, []);

  const { data: me, isLoading, isFetching } = useMeQuery(undefined, {
    skip: !hasToken,                 // ✅ no token = don't call /me
    refetchOnMountOrArgChange: false // ✅ reduce refetch
  });

  useEffect(() => {
    if (!hasToken) return; // not logged in => public pages allowed
    if (!isLoading && !isFetching && me) {
      router.replace(redirectTo);
    }
  }, [hasToken, isLoading, isFetching, me, router, redirectTo]);

  // if logged in and redirecting
  if (hasToken && (isLoading || isFetching)) return null;
  if (hasToken && me) return null;

  return <>{children}</>;
}
