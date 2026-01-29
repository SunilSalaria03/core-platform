"use client";

import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useMeQuery } from "@/common/api/common.api";
import { getFromStorage } from "../utils/storage.utils";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const hasToken = useMemo(() => {
    if (typeof window === "undefined") return false;
    return !!getFromStorage("accessToken");
  }, []);

  const {
    data: me,
    isLoading,
    isFetching,
    isError,
  } = useMeQuery(undefined, {
    skip: !hasToken,                 // ✅ no token = don't call /me
    refetchOnMountOrArgChange: false // ✅ don't refetch each time
  });

  useEffect(() => {
    // if no token -> direct redirect (no api call)
    if (!hasToken) {
      router.replace("/auth/signin");
      return;
    }

    // token exists but API says not logged in (401 etc)
    if (!isLoading && !isFetching && (isError || !me)) {
      router.replace("/auth/signin");
    }
  }, [hasToken, isLoading, isFetching, isError, me, router]);

  // optional: show nothing while checking
  if (!hasToken) return null;
  if (isLoading || isFetching) return null;

  return <>{children}</>;
}
