import type { IApiErrorShape } from "@/common/interfaces/api.interface";

export function getApiErrorMessage(err: unknown, fallback = "Something went wrong") {
  const e = err as { data?: { message?: string }; error?: { data?: { message?: string } }; message?: string };
  return (
    e?.data?.message ||
    e?.error?.data?.message ||
    e?.message ||
    (e as IApiErrorShape)?.message ||
    fallback
  );
}
