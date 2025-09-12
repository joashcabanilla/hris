import * as z from "zod";

export const UpdateProfileSchema = z.object({
  profile: z
    .instanceof(File)
    .refine((file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type), {
      message: "Only JPEG, JPG and PNG images are allowed."
    })
    .refine((file) => file.size <= 1_048_576, {
      message: "Profile picture size must not exceed 1MB."
    })
    .nullable()
});

export const UpdateUserInfoSchema = z
  .object({
    prefix: z.string().min(1, "Prefix is required."),
    firstname: z
      .string()
      .min(1, "First name is required.")
      .min(2, "First name must be at least 2 characters.")
      .regex(/^[a-zA-ZñÑ -]+$/, "First name can only contain letters, hyphens, and spaces."),
    middlename: z
      .string()
      .min(2, "Middle name must be at least 2 characters.")
      .regex(/^[a-zA-ZñÑ -]+$/, "Middle name can only contain letters, hyphens, and spaces.")
      .or(z.literal("")),
    lastname: z
      .string()
      .min(1, "Last name is required.")
      .min(2, "Last name must be at least 2 characters.")
      .regex(/^[a-zA-ZñÑ -]+$/, "Last name can only contain letters, hyphens, and spaces."),
    suffix: z.string().min(1, "Suffix is required.").or(z.literal("")),
    email: z.email("Invalid email address.").min(1, "Email is required."),
    username: z
      .string()
      .min(1, "Username is required.")
      .min(5, "Username must be at least 5 characters.")
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        "Username can only contain letters, numbers, underscores, or hyphens (no spaces)."
      )
      .or(z.literal("")),
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
