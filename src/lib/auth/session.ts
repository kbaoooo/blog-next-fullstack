import { UserStatus, type User } from "@/generated/prisma";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { prisma } from "../prisma";

export interface SessionData {
  userId: string;
  sessionId: string;
  expiresAt: Date;
}

export class SessionService {
  private static readonly SESSION_COOKIE_NAME = "session";
  private static readonly SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in ms
  private static readonly REMEMBER_ME_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days in ms

  /**
   * Create a new session for a user
   */
  static async createSession(
    userId: string,
    userAgent?: string,
    ipAddress?: string,
    rememberMe: boolean = false
  ): Promise<string> {
    const sessionId = this.generateSessionId();
    const duration = rememberMe
      ? this.REMEMBER_ME_DURATION
      : this.SESSION_DURATION;
    const expiresAt = new Date(Date.now() + duration);

    // Store session in database
    await prisma.session.create({
      data: {
        sessionId,
        userId,
        expiresAt,
        userAgent: userAgent || null,
        ipAddress: ipAddress || null,
        device: this.detectDevice(userAgent),
        browser: this.detectBrowser(userAgent),
      },
    });

    // Set cookie with appropriate duration
    this.setSessionCookie(sessionId, expiresAt);

    return sessionId;
  }

  /**
   * Get current session from cookie
   */
  static async getCurrentSession(): Promise<SessionData | null> {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get(this.SESSION_COOKIE_NAME);

    if (!sessionCookie) {
      return null;
    }

    const session = await prisma.session.findUnique({
      where: {
        sessionId: sessionCookie.value,
        isActive: true,
        expiresAt: {
          gt: new Date(), // Not expired
        },
      },
    });

    if (!session) {
      // Invalid or expired session, clear cookie
      this.clearSessionCookie();
      return null;
    }

    // Update last active time
    await prisma.session.update({
      where: { id: session.id },
      data: { lastActiveAt: new Date() },
    });

    return {
      userId: session.userId,
      sessionId: session.sessionId,
      expiresAt: session.expiresAt,
    };
  }

  /**
   * Get current authenticated user
   */
  static async getCurrentUser(): Promise<User | null> {
    const session = await this.getCurrentSession();

    if (!session) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.userId,
        status: UserStatus.ACTIVE, // Only active users
      },
    });

    return user;
  }

  /**
   * Invalidate current session
   */
  static async invalidateSession(sessionId?: string): Promise<void> {
    if (!sessionId) {
      const session = await this.getCurrentSession();
      sessionId = session?.sessionId;
    }

    if (sessionId) {
      await prisma.session.update({
        where: { sessionId },
        data: { isActive: false },
      });
    }

    this.clearSessionCookie();
  }

  /**
   * Invalidate all sessions for a user
   */
  static async invalidateAllUserSessions(userId: string): Promise<void> {
    await prisma.session.updateMany({
      where: { userId },
      data: { isActive: false },
    });

    this.clearSessionCookie();
  }

  /**
   * Clean up expired sessions (call this periodically)
   */
  static async cleanupExpiredSessions(): Promise<void> {
    await prisma.session.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }

  /**
   * Set session cookie with appropriate duration
   */
  private static setSessionCookie(sessionId: string, expiresAt: Date): void {
    const cookieStore = cookies();

    // Calculate maxAge from expiresAt (duration already calculated in createSession)
    const now = Date.now();
    const expiresTime = expiresAt.getTime();
    const maxAge = Math.floor((expiresTime - now) / 1000); // Convert to seconds

    cookieStore.set(this.SESSION_COOKIE_NAME, sessionId, {
      expires: expiresAt,
      maxAge,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }

  /**
   * Clear session cookie
   */
  private static clearSessionCookie(): void {
    const cookieStore = cookies();

    cookieStore.set(this.SESSION_COOKIE_NAME, "", {
      expires: new Date(0),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }

  /**
   * Generate a secure session ID
   */
  private static generateSessionId(): string {
    const sessionId = randomUUID();
    return sessionId;
  }

  /**
   * Detect device type from user agent
   */
  private static detectDevice(userAgent?: string): string | null {
    if (!userAgent) return null;

    if (/mobile/i.test(userAgent)) return "mobile";
    if (/tablet/i.test(userAgent)) return "tablet";
    return "desktop";
  }

  /**
   * Detect browser from user agent
   */
  private static detectBrowser(userAgent?: string): string | null {
    if (!userAgent) return null;

    if (userAgent.includes("Chrome")) return "chrome";
    if (userAgent.includes("Firefox")) return "firefox";
    if (userAgent.includes("Safari")) return "safari";
    if (userAgent.includes("Edge")) return "edge";
    return "other";
  }
}
