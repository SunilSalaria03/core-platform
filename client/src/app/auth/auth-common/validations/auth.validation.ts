import { z } from "zod";

// Signup Validation Schema
export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().nonempty("Email is required").email("Enter a valid email"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type SignupFormValues = z.infer<typeof signupSchema>;

// Signin Validation Schema
export const signinSchema = z.object({
  email: z.string().nonempty("Email is required").email("Enter a valid email"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type SigninFormValues = z.infer<typeof signinSchema>;
