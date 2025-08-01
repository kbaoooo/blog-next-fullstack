"use client";

import { Role, type User } from "@/generated/prisma";
import apiClient from "@/lib/axios";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser?: User | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser || null);
  const [isLoading, setIsLoading] = useState(!initialUser);
  const router = useRouter();

  const refreshUser = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await apiClient.get("/api/auth/me");
      setUser(response.data.user);
    } catch (error) {
      console.error("Failed to refresh user:", error);
      // Auto-logout khi session expired (401) hoặc user không tồn tại
      if (error instanceof Error && error.message.includes("401")) {
        console.log("🔒 Session expired, logging out...");
        toast.error("Phiên làm việc đã hết hạn, vui lòng đăng nhập lại");
        setUser(null);

        // Chỉ redirect nếu đang ở protected route
        if (typeof window !== "undefined") {
          const currentPath = window.location.pathname;
          const protectedRoutes = ["/admin"];

          if (protectedRoutes.some((route) => currentPath.startsWith(route))) {
            router.push(
              "/dang-nhap?redirect=" + encodeURIComponent(currentPath)
            );
          }
        }
      } else {
        setUser(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Initial load - chỉ chạy một lần khi mount
  useEffect(() => {
    if (!initialUser) {
      refreshUser();
    }
  }, [initialUser, refreshUser]);

  // Periodic session check - tách riêng để tránh dependency loop
  useEffect(() => {
    // Chỉ setup interval khi có user và không đang loading
    if (!user || isLoading) return;

    console.log("Setting up periodic session check...");

    // Set up periodic check for session validity (every 5 minutes)
    const interval = setInterval(async () => {
      console.log("Performing periodic session check...");
      try {
        const response = await apiClient.get("/api/auth/me");

        // Chỉ update nếu user data thay đổi
        const newUser = response.data.user;
        setUser((currentUser) => {
          if (JSON.stringify(currentUser) !== JSON.stringify(newUser)) {
            console.log("User data updated during periodic check");
            return newUser;
          }
          return currentUser;
        });
      } catch (error) {
        console.error("❌ Session check failed:", error);
        if (error instanceof Error && error.message.includes("401")) {
          console.log("Session expired during periodic check, logging out...");
          toast.error("Phiên làm việc đã hết hạn, vui lòng đăng nhập lại");
          setUser(null);

          // Redirect to login if on protected route
          if (typeof window !== "undefined") {
            const currentPath = window.location.pathname;
            const protectedRoutes = ["/admin"];

            if (
              protectedRoutes.some((route) => currentPath.startsWith(route))
            ) {
              router.push(
                "/dang-nhap?redirect=" + encodeURIComponent(currentPath)
              );
            }
          }
        }
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => {
      console.log("Clearing periodic session check...");
      clearInterval(interval);
    };
  }, [user, isLoading, router]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

// Convenience hooks
export function useUser() {
  const { user } = useAuth();
  return user;
}

export function useIsAuthenticated() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
}

export function useIsAdmin() {
  const { user } = useAuth();
  return user?.role === Role.ADMIN;
}
