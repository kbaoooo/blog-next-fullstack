import type { Role, User } from "@/generated/prisma";
import { redirect } from "next/navigation";
import { SessionService } from "./session";
/**
 * Require authentication for a page/component
 * Redirects to login if not authenticated
 */
export async function requireAuth(): Promise<User> {
  const user = await SessionService.getCurrentUser();

  if (!user) {
    redirect("/dang-nhap");
  }

  return user;
}

/**
 * Require admin role
 * Redirects to home if not admin
 */
export async function requireAdmin(): Promise<User> {
  const user = await requireAuth();

  if (user.role !== "ADMIN") {
    redirect("/");
  }

  return user;
}

/**
 * Get user if authenticated, null otherwise
 * Does not redirect
 */
export async function getOptionalAuth(): Promise<User | null> {
  return await SessionService.getCurrentUser();
}

/**
 * Check if user has specific role
 */
export function hasRole(
  user: User | null,
  role: Role
): boolean {
  return user?.role === role;
}

/**
 * Check if user is admin
 */
export function isAdmin(user: User | null): boolean {
  return hasRole(user, "ADMIN");
}

/**
 * Check if user is follower or admin
 */
export function isFollowerOrAdmin(user: User | null): boolean {
  return hasRole(user, "FOLLOWER") || hasRole(user, "ADMIN");
}
