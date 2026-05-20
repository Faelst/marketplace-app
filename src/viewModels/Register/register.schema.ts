import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
});

export type RegisterFormData = yup.InferType<typeof registerSchema>;

export const registerSchemaResolver = yupResolver(registerSchema);
