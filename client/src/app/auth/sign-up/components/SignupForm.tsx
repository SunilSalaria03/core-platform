"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, TextField } from "@/shared/components/mui/mui.module";
import { signupSchema, type SignupFormValues } from "../validations/signup.validation";
import { useRegisterMutation } from "@/app/auth/sign-up/api/signup.api";
import { IApiErrorShape } from "@/common/interfaces/api.interface";
import { toast } from "react-hot-toast";

export default function SignupForm() {
  const router = useRouter();
  const [signup, { isLoading }] = useRegisterMutation();
  const [apiError, setApiError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
  });

  const onSubmit = async (values: SignupFormValues) => {
    setApiError(null);
    const res = await signup(values);

    if ("error" in res) {
      toast.error((res.error as IApiErrorShape).message ?? "Signup failed");
      return;
    }

    router.replace("/auth/login");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <TextField
        label="First name"
        {...register("firstName")}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
      />

      <TextField
        label="Last name"
        {...register("lastName")}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
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
