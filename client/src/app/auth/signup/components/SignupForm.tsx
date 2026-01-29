"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, TextField } from "@/shared/components/mui/mui.module";
import { signupSchema, type SignupFormValues } from "../../auth-common/validations/auth.validation";
import { useSignupMutation } from "../../auth-common/api/auth.api";
import { toast } from "react-hot-toast";
import { ApiResponseDto } from "@/common/dto/api.dto";

export default function SignupForm() {
  const router = useRouter();
  const [signup, { isLoading }] = useSignupMutation();
  const [apiError, setApiError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (values: SignupFormValues) => {
    setApiError(null);
    const res = await signup(values);

    if ("error" in res) {
      toast.error((res.error as ApiResponseDto<[]>).message ?? "Signup failed");
      return;
    }

    router.replace("/auth/signin");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <TextField
        label="Name"
        {...register("name" )}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

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
        {isLoading ? "Creating..." : "Sign Up"}
      </Button>
    </form>
  );
}
