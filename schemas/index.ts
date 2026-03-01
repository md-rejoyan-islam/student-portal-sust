import * as z from "zod";

export const LoginSchema = z.object({
  registrationNumber: z.string().min(1, {
    message: "Registration Number is required",
  }),
  password: z.string().min(1, {
    message: "Security Key is required",
  }),
});

export const ForgotPasswordSchema = z.object({
  email: z.email({
    message: "Email is required",
  }),
});

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
    confirmPassword: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, {
      message: "Current password is required",
    }),
    newPassword: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
    confirmPassword: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const UpdateProfileSchema = z.object({
  first_name: z.string().min(1, {
    message: "First name is required",
  }),
  last_name: z.string().min(1, {
    message: "Last name is required",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  phone_number: z.string().min(1, {
    message: "Phone number is required",
  }),
});
