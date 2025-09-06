import * as z from "zod";

export const updateCredentialsSchema = z
  .object({
    name: z.string(),
    usertype: z.string().min(1, "User type is required."),
    email: z.email("Invalid email address.").min(1, "Email is required."),
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
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{6,}$/,
        "Password must contain at least 1 capital letter, 1 lowercase letter, 1 number, and no spaces."
      )
      .or(z.literal("")),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"]
  });
