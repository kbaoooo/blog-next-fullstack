import { z } from "zod";

// Login form validation
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email là bắt buộc")
    .email("Email không hợp lệ")
    .max(255, "Email quá dài"),
  password: z
    .string()
    .min(1, "Mật khẩu là bắt buộc")
    .max(255, "Mật khẩu quá dài"),
  rememberMe: z.boolean().optional(),
});

// Register form validation
export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email là bắt buộc")
      .email("Email không hợp lệ")
      .max(255, "Email quá dài"),
    username: z
      .string()
      .min(3, "Username phải có ít nhất 3 ký tự")
      .max(50, "Username không được quá 50 ký tự")
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        "Username chỉ được chứa chữ, số, dấu gạch dưới và dấu gạch ngang"
      ),
    fullName: z
      .string()
      .min(2, "Họ tên phải có ít nhất 2 ký tự")
      .max(100, "Họ tên không được quá 100 ký tự")
      .optional(),
    password: z
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .max(128, "Mật khẩu không được quá 128 ký tự"),
    confirmPassword: z.string().min(1, "Xác nhận mật khẩu là bắt buộc"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

// Change password validation
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Mật khẩu hiện tại là bắt buộc"),
    newPassword: z
      .string()
      .min(8, "Mật khẩu mới phải có ít nhất 8 ký tự")
      .max(128, "Mật khẩu mới không được quá 128 ký tự"),
    confirmNewPassword: z.string().min(1, "Xác nhận mật khẩu mới là bắt buộc"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmNewPassword"],
  });

// Update profile validation
export const updateProfileSchema = z.object({
  fullName: z
    .string()
    .min(2, "Họ tên phải có ít nhất 2 ký tự")
    .max(100, "Họ tên không được quá 100 ký tự")
    .optional(),
  bio: z.string().max(500, "Bio không được quá 500 ký tự").optional(),
  instagramUrl: z
    .string()
    .url("URL Instagram không hợp lệ")
    .optional()
    .or(z.literal("")),
  facebookUrl: z
    .string()
    .url("URL Facebook không hợp lệ")
    .optional()
    .or(z.literal("")),
  linkedinUrl: z
    .string()
    .url("URL LinkedIn không hợp lệ")
    .optional()
    .or(z.literal("")),
  githubUrl: z
    .string()
    .url("URL GitHub không hợp lệ")
    .optional()
    .or(z.literal("")),
});

// Type exports
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
