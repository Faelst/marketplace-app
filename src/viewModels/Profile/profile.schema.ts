import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
export const profileSchema = yup.object({
  name: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
  password: yup.string().notRequired(),
  confirmPassword: yup.string().optional(),
});

export type ProfileFormData = yup.Asserts<typeof profileSchema>;

export const profileSchemaResolver = yupResolver(profileSchema);
