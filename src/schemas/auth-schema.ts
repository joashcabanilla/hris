import * as z from "zod";

export const LoginSchema = z.object({
  username: z.string().min(1, "Username is required."),
  password: z.string().min(1, "Password is required.")
});

export const FindAccountSchema = z.object({
  email: z.string().min(1, "Email address is required.")
});

export const ResetUserScheme = z
  .object({
    username: z
      .string()
      .min(1, "Username is required.")
      .min(5, "Username must be at least 5 characters.")
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        "Username can only contain letters, numbers, underscores, or hyphens (no spaces)."
      ),
    password: z
      .string()
      .min(1, "Password is required.")
      .min(6, "Password must be at least 6 characters.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
        "Password must contain at least 1 capital letter, 1 lowercase letter, 1 number, and no spaces."
      ),
    confirmPassword: z.string().min(1, "Please confirm your password.")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"]
  });
