import { useMutation } from "@tanstack/react-query";
import { signinApi, signupApi } from "../api/auth.api";

// Signup hook
export const useSignup = () =>
  useMutation({
    mutationKey: ["auth", "signup"],
    mutationFn: signupApi,
  });

// Signin hook
export const useSignin = () =>
  useMutation({
    mutationKey: ["auth", "signin"],
    mutationFn: signinApi,
  });
