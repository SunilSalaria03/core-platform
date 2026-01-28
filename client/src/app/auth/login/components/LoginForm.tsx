"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@/shared/components/mui/mui.module";
import { useLoginMutation } from "../api/login.api";
import { loginSchema, type LoginFormValues } from "../validations/login.validation";
import type { IApiErrorShape } from "@/common/interfaces/api.interface";

export default function LoginForm() {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const [apiError, setApiError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setApiError(null);
    const res = await login(values);

    if ("error" in res) {
      setApiError((res.error as unknown as IApiErrorShape)?.message ?? "Login failed");
      return;
    }

    if (res.data?.accessToken) localStorage.setItem("accessToken", res.data.accessToken);

    router.replace("/admin/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <TextField
        label="Email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        label="Password"
        type="password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      {apiError ? <p className="text-sm text-red-600">{apiError}</p> : null}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Login"}
      </Button>
    </form>
  );
}
