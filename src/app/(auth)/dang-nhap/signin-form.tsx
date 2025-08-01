"use client";

import { loginAction } from "@/app/(auth)/actions";
import FloatingInput from "@/components/custom/floating-input";
import GlassButton from "@/components/custom/glass-button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/lib/auth/auth-context";
import { loginSchema, type LoginInput } from "@/lib/auth/auth-validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Lock, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

export default function SignInForm() {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  // Sử dụng AuthContext để refresh user state
  const { refreshUser } = useAuth();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: LoginInput) {
    setError(undefined);

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);
        if (values.rememberMe) {
          formData.append("rememberMe", "on");
        }

        const result = await loginAction(formData);

        if (result.success) {
          // Refresh user state trước khi redirect
          await refreshUser();

          // Redirect to intended page or home
          router.push(redirectTo);
        } else {
          setError(result.message);

          // Set field-specific errors if available
          if (result.errors) {
            Object.entries(result.errors).forEach(([field, messages]) => {
              if (messages && messages.length > 0) {
                form.setError(field as keyof LoginInput, {
                  message: messages[0],
                });
              }
            });
          }
        }
      } catch (error) {
        console.error("Login error:", error);
        setError("Có lỗi xảy ra, vui lòng thử lại");
      }
    });
  }

  const {
    formState: { errors },
    register,
    handleSubmit,
    watch,
  } = form;
  const rememberMe = watch("rememberMe");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Global Error Message */}
      {error && (
        <div className="flex items-center space-x-2 p-4 bg-red-500/10 border border-red-400/30 rounded-xl backdrop-blur-sm animate-in slide-in-from-top-2 duration-300">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {/* Email Field */}
      <FloatingInput
        {...register("email")}
        label="Địa chỉ email"
        type="email"
        error={errors.email?.message}
        leftIcon={<Mail className="w-5 h-5" />}
      />

      {/* Password Field */}
      <FloatingInput
        {...register("password")}
        label="Mật khẩu"
        isPassword
        error={errors.password?.message}
        leftIcon={<Lock className="w-5 h-5" />}
      />

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="rememberMe"
            {...register("rememberMe")}
            checked={rememberMe}
            onCheckedChange={(checked) =>
              form.setValue("rememberMe", checked === true)
            }
            className="border-white/30 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
          />
          <label
            htmlFor="rememberMe"
            className="text-sm text-gray-300 cursor-pointer select-none"
          >
            Ghi nhớ đăng nhập
          </label>
        </div>

        <button
          type="button"
          className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
        >
          Quên mật khẩu?
        </button>
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
        {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
      </GlassButton>
    </form>
  );
}
