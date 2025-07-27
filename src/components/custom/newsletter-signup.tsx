"use client";

import { cn } from "@/lib/utils";
import { Check, Gift, Mail, Send, X } from "lucide-react";
import { useState } from "react";

interface NewsletterSignupProps {
  variant?: "default" | "compact" | "inline" | "popup";
  className?: string;
  showIcon?: boolean;
  placeholder?: string;
}

export default function NewsletterSignup({
  variant = "default",
  className,
  showIcon = true,
  placeholder = "Nhập email của bạn...",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Vui lòng nhập email hợp lệ");
      return;
    }

    setStatus("loading");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setStatus("success");
    setMessage("Đăng ký thành công! Cảm ơn bạn đã quan tâm.");
    setEmail("");
  };

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className="px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary min-w-0 flex-1"
            disabled={status === "loading" || status === "success"}
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg transition-all",
              status === "success"
                ? "bg-green-500 text-white"
                : "bg-primary text-primary-foreground hover:bg-primary/90",
              (status === "loading" || status === "success") &&
                "opacity-50 cursor-not-allowed"
            )}
          >
            {status === "loading" ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : status === "success" ? (
              <Check className="w-4 h-4" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={cn("space-y-2", className)}>
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-4 py-3 border border-border rounded-xl bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
            disabled={status === "loading" || status === "success"}
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className={cn(
              "px-6 py-3 font-medium rounded-xl transition-all",
              status === "success"
                ? "bg-green-500 text-white"
                : "bg-primary text-primary-foreground hover:bg-primary/90",
              (status === "loading" || status === "success") &&
                "opacity-50 cursor-not-allowed"
            )}
          >
            {status === "loading"
              ? "Đang gửi..."
              : status === "success"
              ? "Thành công!"
              : "Đăng ký"}
          </button>
        </form>

        {message && (
          <p
            className={cn(
              "text-sm",
              status === "error" ? "text-red-500" : "text-green-500"
            )}
          >
            {message}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="text-center space-y-3">
        {showIcon && (
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-2xl mx-auto">
            <Mail className="w-8 h-8 text-white" />
          </div>
        )}

        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Đăng ký Newsletter
          </h3>
          <p className="text-muted-foreground">
            Nhận những bài viết mới nhất và tips hữu ích về lập trình
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="space-y-2">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg mx-auto flex items-center justify-center">
            <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-sm font-medium text-foreground">Bài viết mới</p>
          <p className="text-xs text-muted-foreground">
            Nhận ngay khi có bài mới
          </p>
        </div>

        <div className="space-y-2">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg mx-auto flex items-center justify-center">
            <Gift className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-sm font-medium text-foreground">
            Nội dung độc quyền
          </p>
          <p className="text-xs text-muted-foreground">
            Tips chỉ gửi qua email
          </p>
        </div>

        <div className="space-y-2">
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg mx-auto flex items-center justify-center">
            <X className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-sm font-medium text-foreground">Không spam</p>
          <p className="text-xs text-muted-foreground">Chỉ gửi khi cần thiết</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-12 pr-4 py-4 border border-border rounded-xl bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary text-lg"
            disabled={status === "loading" || status === "success"}
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className={cn(
            "w-full flex items-center justify-center space-x-2 py-4 px-6 font-semibold rounded-xl transition-all text-lg",
            status === "success"
              ? "bg-green-500 text-white"
              : "bg-gradient-to-r from-primary to-purple-600 text-white hover:from-primary/90 hover:to-purple-600/90",
            (status === "loading" || status === "success") &&
              "opacity-75 cursor-not-allowed"
          )}
        >
          {status === "loading" ? (
            <>
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Đang xử lý...</span>
            </>
          ) : status === "success" ? (
            <>
              <Check className="w-5 h-5" />
              <span>Đăng ký thành công!</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Đăng ký ngay</span>
            </>
          )}
        </button>
      </form>

      {/* Message */}
      {message && (
        <div
          className={cn(
            "p-4 rounded-xl text-center",
            status === "error"
              ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
              : "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400"
          )}
        >
          <p className="font-medium">{message}</p>
          {status === "success" && (
            <p className="text-sm mt-1 opacity-75">
              Hãy kiểm tra email của bạn để xác nhận đăng ký.
            </p>
          )}
        </div>
      )}

      {/* Privacy Note */}
      <p className="text-xs text-muted-foreground text-center">
        Chúng tôi tôn trọng quyền riêng tư của bạn. Bạn có thể hủy đăng ký bất
        kỳ lúc nào.
      </p>
    </div>
  );
}
