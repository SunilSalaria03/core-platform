"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@/shared/components/mui/mui.module";
import { useSigninMutation } from "../../auth-common/api/auth.api";
import { SigninRequestDto } from "../../auth-common/dto/auth.dto";
import { signinSchema } from "../../auth-common/validations/auth.validation";
import { ApiResponseDto } from "@/common/dto/api.dto";
import { setToStorage } from "@/common/utils/storage.utils";

export default function SignupForm() {
  const router = useRouter();
  const [signin, { isLoading }] = useSigninMutation();
  const [apiError, setApiError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<SigninRequestDto>({
    resolver: zodResolver(signinSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: SigninRequestDto) => {
    setApiError(null);
    const res = await signin(values);

    if ("error" in res) {
      setApiError((res.error as ApiResponseDto<[]>)?.message ?? "Signin failed");
      return;
    }

    if (res.data?.accessToken) setToStorage("accessToken", res.data.accessToken);

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
        {isLoading ? "Signing in..." : "Signin"}
      </Button>
    </form>
  );
}
