"use client";

import { logoutAction } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/auth-context";
import { LogOut } from "lucide-react";
import { useTransition } from "react";

interface LogoutButtonProps {
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
  showIcon?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export default function LogoutButton({
  variant = "ghost",
  size = "sm",
  showIcon = true,
  children,
  className,
}: LogoutButtonProps) {
  const [isPending, startTransition] = useTransition();

  // ✅ Sử dụng AuthContext để refresh user state
  const { refreshUser } = useAuth();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
      await refreshUser();
    });
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={isPending}
      variant={variant}
      size={size}
      className={className}
    >
      {showIcon && <LogOut className="w-4 h-4 mr-2" />}
      {children || (isPending ? "Đang đăng xuất..." : "Đăng xuất")}
    </Button>
  );
}
