import { ArrowLeft, Sparkles } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import SignUpForm from "./signup-form";

export const metadata: Metadata = {
  title: "Đăng ký",
};

export default function SignUpPage() {
  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Về trang chủ</span>
      </Link>

      {/* Main Card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-400/30 mb-4">
              <Sparkles className="w-8 h-8 text-purple-300" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-400 text-transparent bg-clip-text">
                Tạo tài khoản
              </span>
            </h1>

            <p className="text-gray-300 text-lg">
              Tham gia blog của tôi để khám phá những kiến thức mới
            </p>
          </div>

          {/* Decorative Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
            </div>
            <div className="relative flex justify-center">
              <div className="bg-black/50 backdrop-blur-sm px-6 py-2 rounded-full border border-purple-400/20">
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full opacity-60" />
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full opacity-60" />
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <SignUpForm />

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-center text-gray-300">
              Đã có tài khoản?{" "}
              <Link
                href="/dang-nhap"
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
