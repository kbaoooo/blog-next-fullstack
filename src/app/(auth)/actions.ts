"use server";

import { Role, UserStatus, type User } from "@/generated/prisma";
import {
  loginSchema,
  registerSchema,
  type LoginInput,
  type RegisterInput,
} from "@/lib/auth/auth-validations";
import { PasswordService } from "@/lib/auth/password";
import { SessionService } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export interface ActionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  user?: User;
}

/**
 * Login action
 */
export async function loginAction(formData: FormData): Promise<ActionResult> {
  try {
    // Parse form data
    const data: LoginInput = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      rememberMe: formData.get("rememberMe") === "on",
    };

    // Validate input
    const validation = loginSchema.safeParse(data);
    if (!validation.success) {
      return {
        success: false,
        message: "Dữ liệu không hợp lệ",
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const { email, password, rememberMe } = validation.data;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        success: false,
        message: "Email hoặc mật khẩu không đúng",
      };
    }

    // Check if user is active
    if (user.status !== UserStatus.ACTIVE) {
      return {
        success: false,
        message: "Tài khoản đã bị vô hiệu hóa",
      };
    }

    // Verify password
    const isValidPassword = await PasswordService.verifyPassword(
      password,
      user.password
    );
    if (!isValidPassword) {
      return {
        success: false,
        message: "Email hoặc mật khẩu không đúng",
      };
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Create session
    const headersList = headers();
    const userAgent = headersList.get("user-agent") || undefined;
    const forwarded = headersList.get("x-forwarded-for");
    const ipAddress = forwarded
      ? forwarded.split(",")[0]
      : headersList.get("x-real-ip") || undefined;

    await SessionService.createSession(
      user.id,
      userAgent,
      ipAddress,
      rememberMe
    );

    // Remove password from user object
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser } = user;

    return {
      success: true,
      message: "Đăng nhập thành công",
      user: safeUser as User,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "Có lỗi xảy ra, vui lòng thử lại",
    };
  }
}

/**
 * Register action
 */
export async function registerAction(
  formData: FormData
): Promise<ActionResult> {
  try {
    // Parse form data
    const data: RegisterInput = {
      email: formData.get("email") as string,
      username: formData.get("username") as string,
      fullName: (formData.get("fullName") as string) || undefined,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    // Validate input
    const validation = registerSchema.safeParse(data);
    if (!validation.success) {
      return {
        success: false,
        message: "Dữ liệu không hợp lệ",
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const { email, username, fullName, password } = validation.data;

    // Additional password validation
    const passwordValidation = PasswordService.validatePassword(password);
    if (!passwordValidation.isValid) {
      return {
        success: false,
        message: "Mật khẩu không đủ mạnh",
        errors: {
          password: passwordValidation.errors,
        },
      };
    }

    // Check if email already exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUserByEmail) {
      return {
        success: false,
        message: "Email đã được sử dụng",
        errors: {
          email: ["Email này đã có người sử dụng"],
        },
      };
    }

    // Check if username already exists
    const existingUserByUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUserByUsername) {
      return {
        success: false,
        message: "Username đã được sử dụng",
        errors: {
          username: ["Username này đã có người sử dụng"],
        },
      };
    }

    // Hash password
    const hashedPassword = await PasswordService.hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        username,
        fullName: fullName || null,
        password: hashedPassword,
        role: Role.GUEST, // Default role for new users
        status: UserStatus.ACTIVE,
      },
    });

    // Create session for new user
    const headersList = headers();
    const userAgent = headersList.get("user-agent") || undefined;
    const forwarded = headersList.get("x-forwarded-for");
    const ipAddress = forwarded
      ? forwarded.split(",")[0]
      : headersList.get("x-real-ip") || undefined;

    await SessionService.createSession(user.id, userAgent, ipAddress);

    // Remove password from user object
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser } = user;

    return {
      success: true,
      message: "Đăng ký thành công",
      user: safeUser as User,
    };
  } catch (error) {
    console.error("Register error:", error);
    return {
      success: false,
      message: "Có lỗi xảy ra, vui lòng thử lại",
    };
  }
}

/**
 * Logout action
 */
export async function logoutAction(): Promise<void> {
  try {
    await SessionService.invalidateSession();
  } catch (error) {
    console.error("Logout error:", error);
  }

  redirect("/dang-nhap");
}
