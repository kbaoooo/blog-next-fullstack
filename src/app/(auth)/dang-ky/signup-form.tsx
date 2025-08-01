"use client";

import { registerAction } from "@/app/(auth)/actions";
import FloatingInput from "@/components/custom/floating-input";
import GlassButton from "@/components/custom/glass-button";
import { useAuth } from "@/lib/auth/auth-context";
import {
  registerSchema,
  type RegisterInput,
} from "@/lib/auth/auth-validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Lock, Mail, User, UserCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

export default function SignUpForm() {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Sử dụng AuthContext để refresh user state
  const { refreshUser } = useAuth();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: RegisterInput) {
    setError(undefined);

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("username", values.username);
        if (values.fullName) {
          formData.append("fullName", values.fullName);
        }
        formData.append("password", values.password);
        formData.append("confirmPassword", values.confirmPassword);

        const result = await registerAction(formData);

        if (result.success) {
          // Refresh user state trước khi redirect
          await refreshUser();

          // Redirect to home page
          router.push("/");
        } else {
          setError(result.message);

          // Set field-specific errors if available
          if (result.errors) {
            Object.entries(result.errors).forEach(([field, messages]) => {
              if (messages && messages.length > 0) {
                form.setError(field as keyof RegisterInput, {
                  message: messages[0],
                });
              }
            });
          }
        }
      } catch (error) {
        console.error("Register error:", error);
        setError("Có lỗi xảy ra, vui lòng thử lại");
      }
    });
  }

  const {
    formState: { errors },
  } = form;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Global Error Message */}
      {error && (
        <div className="flex items-center space-x-2 p-4 bg-red-500/10 border border-red-400/30 rounded-xl backdrop-blur-sm animate-in slide-in-from-top-2 duration-300">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {/* Email Field */}
      <FloatingInput
        {...form.register("email")}
        label="Địa chỉ email"
        type="email"
        error={errors.email?.message}
        leftIcon={<Mail className="w-5 h-5" />}
      />

      {/* Username Field */}
      <FloatingInput
        {...form.register("username")}
        label="Tên đăng nhập"
        error={errors.username?.message}
        leftIcon={<User className="w-5 h-5" />}
      />

      {/* Full Name Field */}
      <FloatingInput
        {...form.register("fullName")}
        label="Họ và tên"
        error={errors.fullName?.message}
        leftIcon={<UserCheck className="w-5 h-5" />}
      />

      {/* Password Field */}
      <FloatingInput
        {...form.register("password")}
        label="Mật khẩu"
        isPassword
        error={errors.password?.message}
        leftIcon={<Lock className="w-5 h-5" />}
      />

      {/* Confirm Password Field */}
      <FloatingInput
        {...form.register("confirmPassword")}
        label="Xác nhận mật khẩu"
        isPassword
        error={errors.confirmPassword?.message}
        leftIcon={<Lock className="w-5 h-5" />}
      />

      {/* Password Requirements */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
        <h4 className="text-sm font-medium text-purple-300 mb-2">
          Yêu cầu mật khẩu:
        </h4>
        <ul className="text-xs text-gray-300 space-y-1">
          <li>• Ít nhất 8 ký tự</li>
          <li>• Có chữ hoa và chữ thường</li>
          <li>• Có ít nhất 1 số</li>
          <li>• Có ít nhất 1 ký tự đặc biệt</li>
        </ul>
      </div>

      {/* Submit Button */}
      <GlassButton
        type="submit"
        isLoading={isPending}
        variant="primary"
        size="lg"
        className="w-full group"
        disabled={isPending}
      >
        {isPending ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
      </GlassButton>
    </form>
  );
}
