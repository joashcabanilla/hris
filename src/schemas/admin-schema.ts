import * as z from "zod";
import { isValid, parse } from "date-fns";

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

export const employeeSchema = z.object({
  profile: z
    .instanceof(File)
    .refine((file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type), {
      message: "Only JPEG, JPG and PNG images are allowed."
    })
    .refine((file) => file.size <= 1_048_576, {
      message: "Profile picture size must not exceed 1MB."
    })
    .nullable(),
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
  gender: z.string().min(1, "Gender is required."),
  birthdate: z
    .string()
    .min(1, "Date of birth is required.")
    .refine((val) => /^\d{2}\/\d{2}\/\d{4}$/.test(val), "Use MM/DD/YYYY format.")
    .refine((val) => {
      const parsed = parse(val, "MM/dd/yyyy", new Date());
      return isValid(parsed);
    }, "Invalid date format."),
  civilStatus: z.string().min(1, "Civil status is required."),
  email: z.email("Invalid email address.").min(1, "Email is required."),
  contactNo: z
    .string()
    .min(11, "Contact number must be at least 11 digits.")
    .max(11, "Contact number must not exceed 11 digits.")
    .regex(/^09\d{9}$/, "Contact number must start with 09 and contain 11 digits."),
  emergencyContactName: z.string().min(1, "Emergency contact name is required."),
  emergencyContactNo: z
    .string()
    .min(11, "Emergency contact number must be at least 11 digits.")
    .max(11, "Emergency contact number must not exceed 11 digits.")
    .regex(/^09\d{9}$/, "Emergency contact number must start with 09 and contain 11 digits."),
  region: z.string().min(1, "Region is required."),
  province: z.string().min(1, "Province is required."),
  city: z.string().min(1, "City is required."),
  barangay: z.string().min(1, "Barangay is required."),
  address: z.string().min(1, "Address is required."),
  zipCode: z.string().min(4, "Zip code must be at least 4 digits.")
});
