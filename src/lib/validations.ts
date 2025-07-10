import {z} from 'zod';

const requiredString = z.string().trim().min(1, "Không được để trống");

export const signInSchema = z.object({
  email: requiredString.email("Email không hợp lệ"),
  password: requiredString.min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  rememberMe: z.boolean(),
});

export type SignInType = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  email: requiredString.email("Email không hợp lệ"),
  password: requiredString.min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  confirmPassword: requiredString,
}).refine(data => data.password === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
});

export type SignUpType = z.infer<typeof signUpSchema>;
    