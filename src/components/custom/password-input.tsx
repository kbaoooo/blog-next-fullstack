import React from "react";
import { useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOffIcon } from "lucide-react";

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className={cn("pe-10", className)}
        ref={ref}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
        className="absolute right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground"
      >
        {showPassword ? (
          <EyeOffIcon className="size-5" />
        ) : (
          <Eye className="size-5" />
        )}
      </button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
