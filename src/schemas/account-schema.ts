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
