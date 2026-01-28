import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().nonempty("Email is required").email("Enter a valid email"),
  password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters"),
});

export type SignupFormValues = z.infer<typeof signupSchema>;
