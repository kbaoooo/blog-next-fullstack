"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { forwardRef } from "react";

interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      isLoading = false,
      variant = "primary",
      size = "md",
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "relative overflow-hidden font-semibold rounded-xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";

    const variantClasses = {
      primary:
        "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg hover:shadow-xl border border-purple-400/30",
      secondary:
        "bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 backdrop-blur-sm",
      ghost:
        "bg-transparent hover:bg-white/10 text-white border border-transparent hover:border-white/20",
    };

    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="relative flex items-center justify-center space-x-2">
          {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
          <span className={cn(isLoading && "opacity-70")}>{children}</span>
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-transform duration-1000 group-hover:translate-x-full" />
      </button>
    );
  }
);

GlassButton.displayName = "GlassButton";

export default GlassButton;
