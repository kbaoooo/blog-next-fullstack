"use client";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";

interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isPassword?: boolean;
  leftIcon?: React.ReactNode;
}

const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  (
    { label, error, isPassword = false, leftIcon, className, ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(
      !!props.value || !!props.defaultValue
    );

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      props.onChange?.(e);
    };

    const inputType = isPassword
      ? showPassword
        ? "text"
        : "password"
      : props.type;

    return (
      <div className="relative group">
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            {...props}
            type={inputType}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            className={cn(
              // Base styles
              "peer w-full pt-6 pb-2 bg-white/5 backdrop-blur-sm border rounded-xl transition-all duration-300 outline-none",
              // Padding - adjust based on leftIcon
              leftIcon ? "pl-12 pr-4" : "px-4",
              // Border styles
              "border-white/20 hover:border-white/30",
              // Focus styles
              "focus:border-purple-400/60 focus:bg-white/10",
              // Text styles
              "text-white placeholder-transparent",
              // Shadow
              "shadow-lg hover:shadow-xl focus:shadow-2xl",
              // Error styles
              error && "border-red-400/60 focus:border-red-400/80",
              className
            )}
            placeholder={label}
          />

          {/* Floating Label */}
          <label
            className={cn(
              "absolute transition-all duration-300 pointer-events-none z-10",
              // Default position (when empty and not focused)
              "top-4 text-gray-400 text-base",
              // Floating position (when focused or has value)
              (isFocused || hasValue) && "top-2 text-xs text-purple-300",
              // Error state
              error && "text-red-300",
              // Adjust left position based on whether there's an icon
              leftIcon ? "left-12" : "left-4"
            )}
          >
            {label}
          </label>

          {/* Password Toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors z-20"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p className="mt-2 text-sm text-red-300 animate-in slide-in-from-top-1 duration-200">
            {error}
          </p>
        )}

        {/* Focus Ring Effect */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl transition-all duration-300 pointer-events-none",
            "ring-2 ring-transparent",
            isFocused && "ring-purple-400/20"
          )}
        />
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";

export default FloatingInput;
